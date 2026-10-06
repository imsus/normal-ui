// Compiles the generated StyleX sources (defineConsts throws at runtime
// uncompiled) to plain JS, so consumers need no StyleX setup. Types come
// from `tsc -p tsconfig.build.json`, run after this by `pnpm build`.
import { build } from 'esbuild';
import stylex from '@stylexjs/unplugin';
import { fileURLToPath } from 'node:url';
import { appendFileSync } from 'node:fs';
import { stylexConstVars } from './stylex-const-vars.mjs';

const root = new URL('../', import.meta.url);
const entryPoints = ['src/tokens.stylex.ts', 'src/themes.stylex.ts'].map((f) =>
  fileURLToPath(new URL(f, root)),
);

await build({
  entryPoints,
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  external: ['@stylexjs/stylex'],
  outdir: fileURLToPath(new URL('dist/', root)),
  logLevel: 'warning',
  plugins: [stylex.esbuild({ dev: false })],
});
console.log('stylex: wrote dist/tokens.stylex.js, dist/themes.stylex.js');

// Consumers' StyleX turns these tokens into hashed custom properties; define them.
const constVars = stylexConstVars(['tokens', 'themes'].map((name) => ({
  source: new URL(`src/${name}.stylex.ts`, root),
  published: `@imsus/normal-ui-css:dist/${name}.stylex.js`,
})));
for (const file of ['dist/index.css', 'dist/tokens.css']) appendFileSync(new URL(file, root), `\n${constVars}`);
console.log('stylex: appended token custom properties to dist/index.css, dist/tokens.css');
