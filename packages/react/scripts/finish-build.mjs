// The StyleX plugin appends component rules to a CSS asset, or writes its
// `stylex.css` fallback when the build has no CSS entry (ours doesn't; it lands
// in dist/assets/). The public file is dist/styles.css, so move it there;
// fail loudly if missing.
import { existsSync, renameSync, readFileSync, writeFileSync } from 'node:fs';
import { stylexConstVars } from '../../css/scripts/stylex-const-vars.mjs';

const candidates = ['../dist/stylex.css', '../dist/assets/stylex.css'].map((p) => new URL(p, import.meta.url));
const from = candidates.find((u) => existsSync(u));
if (!from) throw new Error('react build: stylex.css missing, StyleX emitted no CSS');
const to = new URL('../dist/styles.css', import.meta.url);
renameSync(from, to);
// Component rules must beat the element layers whatever the import order: declare
// the full order up front (a repeat declaration is harmless when index.css ran first).
const css = readFileSync(to, 'utf8');
// dist/tokens.stylex.js re-exports the css package's tokens, but a consumer's StyleX
// hashes them under this package's path: define those names too.
const constVars = stylexConstVars([{
  source: new URL('../../css/src/tokens.stylex.ts', import.meta.url),
  published: '@imsus/normal-ui-react:dist/tokens.stylex.js',
}]);
writeFileSync(to, `@layer normal-ui, normal-ui-theme;\n${css}\n${constVars}`);
console.log('react build: moved StyleX CSS to dist/styles.css');
