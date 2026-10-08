# Normal UI

The browser's own stylesheet, repaired to WCAG 2.2 AA, distributed as installable
CSS and React components. Public and experimental (0.x).

```bash
pnpm install
pnpm dev        # docs at http://localhost:4321
pnpm build      # packages, type-check, static site in apps/docs/dist/
```

## Layout

| Path | What |
| --- | --- |
| `packages/css` | `@imsus/normal-ui-css`: tokens, base styles, patterns, themes. `tokens.json` is the source of every value; `scripts/build-tokens.mjs` generates `src/` and `dist/`. |
| `packages/css/themes/<id>/` | A theme: `tokens.json` (only what it changes or adds) and `theme.css` (element rules). Set with `data-theme="<id>"`. |
| `packages/react` | `@imsus/normal-ui-react`: 42 React components as source plus the precompiled `dist/` (one chunk per component, `styles.css`). |
| `apps/docs` | The docs site (Astro), consuming both packages through `workspace:*`. Guidelines, component notes and examples live in `apps/docs/docs/`. |
| `fixtures/vite`, `fixtures/next` | Consumer smoke tests: packed tarballs installed and built in CI. |
| `skills/` | Pointers to the agent skills shipped inside each package. |

## Working here

- `pnpm tokens` rebuilds the CSS package (tokens, `dist/`, contrast gate).
- `pnpm run build:react` rebuilds the React `dist/` (needs the CSS `dist/` first).
- `pnpm check` type-checks; `pnpm deploy` ships the docs to Cloudflare Pages.
- `pnpm tokens` fails if any theme drops below WCAG 2.2 AA contrast. Fix the
  value, or waive a theme pair with a written reason.
- Components take native props plus `className`/`style` (applied after the
  component's own styles) and `xstyle` for StyleX users. Interactive components
  carry `'use client'`; static ones (Badge, Alert, Breadcrumb, Stepper, Switch,
  Select, TableOfContents, and the rest) render as server components.
- Agent skills live beside the code they teach (`packages/*/skills/`); the React
  skill's per-component references copy from `apps/docs/docs/components/` at
  build time. Never edit the copies.
- The CSS standard is good-css.com, pinned in `skills/good-css/` (see
  `apps/docs/docs/adr/0002-adopt-good-css.md`). Read the matching
  `references/*.md` before writing any CSS or StyleX.

## How the CSS fits together

1. `tokens.css` defines the custom properties (unlayered).
2. `base.css` and `patterns.css` style elements inside `@layer normal-ui` and `:where()`.
3. Component styles (StyleX) sit in their own layers, declared after `normal-ui`
   and `normal-ui-theme`, so they always beat element defaults.
4. A theme's values are unlayered, scoped to `[data-theme="<id>"]`; its element
   rules sit in `normal-ui-theme`, between `normal-ui` and the components.
5. Your own unlayered CSS beats all of it.

Color scheme: no `data-color-scheme` follows the device; `"light"` or `"dark"` on
`<html>` (or any element) forces one. Every value a component draws with is a
token, so themes reach the React components too.

## Using the packages

Consumers install from npm (see each package's README and the docs site's
Getting started page):

```ts
import '@imsus/normal-ui-css';
import '@imsus/normal-ui-css/themes/govuk.css'; // optional theme
import '@imsus/normal-ui-react/styles.css';
```

```tsx
import { Alert, Button, TextField } from '@imsus/normal-ui-react';
```

## Dependencies

Docs runtime: `astro`, `@astrojs/react`, `react`, `react-dom`, `@stylexjs/stylex`.
Build: `@stylexjs/unplugin`, `typescript`, `vite`, `esbuild`, `wrangler`.
No other libraries: popovers, dialogs, the custom select, the scroll carousel and the
table of contents use the platform.
