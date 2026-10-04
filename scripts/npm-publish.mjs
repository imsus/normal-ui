// Publishes workspace package versions that npm still lacks, with provenance
// over OIDC (changesets shells out to `pnpm publish`, which cannot do OIDC).
// Idempotent: already-published versions are skipped, so the release workflow
// runs this on every push and it only ever publishes what's missing — including
// the first 0.1.0 of both packages once the trusted publisher is configured.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: 'utf8', stdio: 'pipe', ...opts });

const published = (name, version) => {
  try {
    return run('npm', ['view', `${name}@${version}`, 'version']).trim() === version;
  } catch {
    return false;
  }
};

const packages = [
  { name: '@imsus/normal-ui-css', dir: new URL('../packages/css/', import.meta.url) },
  { name: '@imsus/normal-ui-react', dir: new URL('../packages/react/', import.meta.url) },
];

for (const { name, dir } of packages) {
  const { version } = JSON.parse(readFileSync(new URL('package.json', dir), 'utf8'));
  if (published(name, version)) {
    console.log(`${name}@${version} already on npm, skipping`);
    continue;
  }
  try {
    run('npm', ['publish', '--provenance', '--access', 'public'], { cwd: dir, stdio: 'inherit' });
  } catch (err) {
    const stderr = String(err.stderr ?? err.message ?? err);
    if (/already published|EPUBLISHCONFLICT|E409/.test(stderr)) {
      console.log(`${name}@${version} appeared during the run, skipping`);
      continue;
    }
    throw err;
  }
  run('git', ['tag', `${name}@${version}`]);
  run('git', ['push', 'origin', 'tag', `${name}@${version}`]);
  console.log(`published ${name}@${version} with provenance`);
}
