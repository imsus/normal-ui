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
