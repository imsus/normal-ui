// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import stylex from '@stylexjs/unplugin';

export default defineConfig({
  integrations: [
    react({
      // The workspace packages resolve through pnpm symlinks to real paths under
      // packages/*/dist, so plugin-react's default /node_modules/ exclude misses
      // them and it wraps the precompiled output in Fast Refresh code. That breaks
      // lazily loaded islands (missing preamble) for no benefit: dist has no JSX
      // source left to refresh. Exclude it; dist rebuilds full-reload instead.
      // The search palette is imported by a plain <script> (Docs.astro), not an
      // island, so pages without islands never get the preamble either.
      exclude: [/\/packages\/react\/dist\//, /\/packages\/css\/dist\//, /\/src\/site\/searchPalette\.tsx$/],
    }),
  ],
  // Astro's HTML compression drops the space where text breaks onto a new line
  // before a tag ("in\n<a>" renders as "in<a>"). Keep the source whitespace.
  compressHTML: false,
  // Code blocks in the docs' Markdown stay plain <pre><code>, styled by the system,
  // instead of Astro's default dark syntax theme.
  markdown: { syntaxHighlight: false },
  // Docs pages are static: fetch the next one when a link is hovered or focused, so
  // moving through the nav feels instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  experimental: {
    // Where the browser supports the Speculation Rules API, prerender the page
    // instead of only fetching it. Others fall back to the prefetch above.
    clientPrerender: true,
  },
  vite: {
    optimizeDeps: {
      // Pre-bundle React up front so Vite never re-optimizes mid-session (that leaves
      // islands importing stale ?v= hashes and failing with 504 Outdated Optimize Dep).
      include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      // StyleX's runtime is already ESM; keeping it out of pre-bundling keeps compiled
      // components and the runtime on the same URL.
      exclude: ['@stylexjs/stylex'],
    },
    plugins: [
      stylex.vite({
        // Atomic StyleX rules go in their own layer, declared after normal-ui,
        // so a component's styles always beat the element defaults underneath.
        useCSSLayers: true,
        devMode: 'full',
        // Astro renders components on the server and in the browser: share the rules.
        devPersistToDisk: true,
      }),
    ],
  },
});
