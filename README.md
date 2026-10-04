# Normal UI

The browser's own stylesheet, repaired to WCAG 2.2 AA, as code: Astro for the docs
site, React components styled with StyleX.

Moved from the Normal UI design system artifact. The guidelines (`docs/README.md`)
and every component's notes (`docs/components`, `docs/examples`) came across unchanged
apart from how to load the code.

```bash
pnpm install
pnpm dev        # docs at http://localhost:4321
pnpm build      # tokens, type-check, static site in dist/
```

## Layout

| Path | What |
| --- | --- |
| `tokens.json` | Every value. Edit only here. |
| `scripts/build-tokens.mjs` | Writes `src/styles/tokens.css` and `src/tokens.stylex.ts` from `tokens.json` (runs before dev and build). |
| `src/styles/tokens.css` | Generated custom properties: light, dark, device-following dark, and `data-color-scheme` on any element. |
| `src/tokens.stylex.ts` | Generated StyleX constants (`color.canvas`, `space.md`, …) that compile to `var(--…)`. |
| `src/styles/base.css` | Reset and element styles in the `normal-ui` layer. The core of the system. |
| `themes/<id>/` | A theme: `tokens.json` (only what it changes or adds) and `theme.css` (element rules). Set with `data-theme="<id>"`. |
| `src/styles/themes.css`, `src/themes.stylex.ts`, `src/themes.ts` | Generated from `themes/*/tokens.json`: the scoped values, StyleX constants for added tokens, and the list the docs read. |
| `src/styles/patterns.css` | Composite components for hand-written HTML (`.pd-badge`, `[role=tab]`, …). |
| `src/components` | 42 React components, each styled with StyleX. `index.ts` exports them all. |
| `src/demos` | The live examples on the docs pages, and `registry.ts` (atomic level, what each is made of, group, usage snippet). |
| `src/examples` | 38 templates and pages, kept as plain HTML. The `level` in each file's `@dsCard` comment puts it under `/templates/` or `/pages/`; each is served on its own at `/<level>/<slug>/preview/`. |
| `src/site`, `src/layouts`, `src/pages` | The docs site, organised by atomic design: `/atoms/`, `/molecules/`, `/organisms/`, `/templates/`, `/pages/`, each item at a kebab-case slug of its title (`/atoms/text-field/`, `/pages/checkout/`). Levels, slugs and titles are defined in `src/lib/site.ts`. |

## How the CSS fits together

1. `tokens.css` defines the custom properties.
2. `base.css` styles elements inside `@layer normal-ui` and `:where()`.
3. StyleX writes atomic classes into its own layers (`useCSSLayers`), declared after
   `normal-ui`, so component styles always beat element defaults. The base layout
   declares `@layer normal-ui;` first in `<head>` so this holds in dev too, where
   the StyleX stylesheet loads first.
4. A theme's element rules (`themes/<id>/theme.css`) sit in `normal-ui-theme`, between
   `normal-ui` and StyleX. Its values are unlayered and scoped to `[data-theme="<id>"]`.
5. Your own unlayered CSS beats all of it.

Color scheme: no `data-color-scheme` follows the device; `data-color-scheme="light"` or `"dark"` on
`<html>` (or any element) forces one.
Theme: no `data-theme` is plain Normal UI; `data-theme="usgraphics"`, `"mcmaster"` or
`"govuk"` applies a theme (GOV.UK is light only). Every value a component draws with is a
token, so themes reach the React components too. `pnpm tokens` fails if a theme drops
below WCAG 2.2 AA contrast.

## Using the components

```tsx
import { Button, TextField, Alert, Stack } from '../components';

<Stack>
  <Alert kind="warning">3 products are almost out of stock.</Alert>
  <TextField label="Email address" type="email" autoComplete="email" />
  <Button type="submit">Save address</Button>
</Stack>
```

Every component takes native props where it wraps one element, plus `xstyle` (a StyleX
style) where overriding makes sense. Load `tokens.css` and `base.css` once per page.
In Astro, hydrate only the ones that need script (`client:visible`); Badge, Alert,
Breadcrumb, Stepper, Switch, Select, MenuButton and the rest of the static ones ship
no JavaScript.

## Dependencies

Runtime: `astro`, `@astrojs/react`, `react`, `react-dom`, `@stylexjs/stylex`.
Dev: `@stylexjs/unplugin`, `typescript`, `@types/react`, `@types/react-dom`.
No other libraries: popovers, dialogs, the custom select, the scroll carousel and the
table of contents use the platform.
