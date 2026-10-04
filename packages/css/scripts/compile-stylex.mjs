// Compiles the generated StyleX sources (defineConsts throws at runtime
// uncompiled) to plain JS, so consumers need no StyleX setup. Types come
// from `tsc -p tsconfig.build.json`, run after this by `pnpm build`.
import { build } from 'esbuild';
import stylex from '@stylexjs/unplugin';
import { fileURLToPath } from 'node:url';

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
