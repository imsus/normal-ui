// Packs both packages for the consumer fixtures under stable names, so the
// fixtures can install real tarballs (proving `files` and `exports`) while the
// versions keep moving. Run before installing or building fixtures.
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const out = new URL('fixtures/tarballs/', root);
mkdirSync(out, { recursive: true });

for (const [dir, name] of [['packages/css', 'css'], ['packages/react', 'react']]) {
  const cwd = fileURLToPath(new URL(`${dir}/`, root));
  execFileSync('pnpm', ['pack', '--silent'], { cwd, stdio: 'inherit' });
  const tgz = readdirSync(cwd).find((f) => f.endsWith('.tgz'));
  if (!tgz) throw new Error(`pack-fixtures: no tarball in ${dir}`);
  copyFileSync(new URL(`${dir}/${tgz}`, root), new URL(`fixtures/tarballs/${name}.tgz`, root));
  rmSync(new URL(`${dir}/${tgz}`, root));
}
console.log('pack-fixtures: wrote fixtures/tarballs/{css,react}.tgz');
