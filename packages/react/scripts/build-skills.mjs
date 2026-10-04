// Copies the component docs into the React skill's references/, so agents read
// the same text as the docs site. Runs in `pnpm build`; never edit the outputs.
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';

const root = new URL('../../../', import.meta.url);
const from = new URL('apps/docs/docs/components/', root);
const to = new URL('packages/react/skills/normal-ui-react/references/', root);
mkdirSync(to, { recursive: true });

let n = 0;
for (const f of readdirSync(from).sort()) {
  if (!f.endsWith('.md')) continue;
  copyFileSync(new URL(f, from), new URL(f, to));
  n++;
}
console.log(`skills: copied ${n} component docs to react references/`);
