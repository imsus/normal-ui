// Precompiled StyleX library build: one chunk per component (so 'use client'
// survives per module in ticket 06) plus the barrel and the tokens re-export.
// Consumers need no StyleX setup; dist/styles.css holds every component rule
// in its own layers, declared after normal-ui and normal-ui-theme by import order.
import { defineConfig } from 'vite';
import stylex from '@stylexjs/unplugin';
import { readdirSync } from 'node:fs';

const dir = new URL('./src/components/', import.meta.url);
const components = readdirSync(dir)
  .filter((f) => f.endsWith('.tsx') || f === 'shared.ts')
  .map((f) => f.replace(/\.(tsx|ts)$/, ''));
const input = {
  index: './src/index.ts',
  'tokens.stylex': './src/tokens.stylex.ts',
  ...Object.fromEntries(components.map((n) => [`components/${n}`, `./src/components/${n}`])),
};

export default defineConfig({
  plugins: [stylex.vite({ dev: false, useCSSLayers: true })],
  esbuild: { jsx: 'automatic' },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
    assetsInlineLimit: 0,
    lib: {
      entry: input,
      formats: ['es'],
      fileName: (_format, name) => `${name}.js`,
    },
    rollupOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^@stylexjs\/stylex($|\/)/, /^@imsus\/normal-ui-css($|\/)/],
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
  },
});
