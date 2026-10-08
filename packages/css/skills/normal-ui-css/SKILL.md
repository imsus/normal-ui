---
name: normal-ui-css
description: "Style plain HTML with Normal UI without React: install the CSS package, import order, color schemes, themes, patterns, and token overrides. Use when writing hand-written markup or styling any framework from the design tokens."
---

# Normal UI CSS

The browser's own stylesheet, repaired to WCAG 2.2 AA, as plain CSS. No build step, no JavaScript.

## Install

```bash
pnpm add @imsus/normal-ui-css
```

```ts
import '@imsus/normal-ui-css'; // tokens + base styles + patterns
import '@imsus/normal-ui-css/themes/govuk.css'; // optional theme: govuk, mcmaster, or usgraphics
```

Import the base first: the cascade order is `normal-ui`, then `normal-ui-theme`,
then component styles, then your own unlayered CSS. Your unlayered rules always win.

## Color scheme and theme

`data-color-scheme="light|dark"` forces a color scheme on an element (or `<html>`).
Without it, the page follows the device. `data-theme="govuk|mcmaster|usgraphics"`
applies a theme; without it, you get plain Normal UI. GOV.UK is light only.
Each token holds both schemes as one `light-dark()` declaration; switching sets
`color-scheme` only, so a forced scheme works on any element.

## Plain HTML

Write semantic elements and they already look right: `button`, `a`, `label` +
`input`, `fieldset` + `legend`, `details` + `summary`, `table` with `th scope`.
Never rebuild these from `div`s. For composite pieces, use the patterns in
[patterns](references/patterns.md): `pd-` classes and ARIA roles, no JavaScript.

## Tokens

Every value is a custom property (`--canvas`, `--space-md`, `--font-sans`).
Customize by overriding properties on an element, never by editing the package:

```css
.pd-sheet {
  --canvas: #faf8f2;
}
```

`tokens.json` (package export `./tokens.json`) is the value source for tooling.
Colours are written in `oklch()` there; a variant of another token is a
`color-mix(in oklch, …)` from its base.

## Motion

Transitions that move or scale run only inside `@media (prefers-reduced-motion: no-preference)`.
There is no global kill switch: if your own CSS animates, gate it the same way.

## CSS standard

Every stylesheet follows [good-css.com](https://good-css.com/), pinned in
`skills/good-css/` at the repo root (see `apps/docs/docs/adr/0002-adopt-good-css.md`).
Read the matching `references/*.md` there before writing any CSS.
