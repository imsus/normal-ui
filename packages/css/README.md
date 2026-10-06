# @imsus/normal-ui-css

Normal UI as plain CSS: design tokens, base styles for semantic HTML, hand-written
patterns, and three themes. No build step, no JavaScript, any framework.

Public and experimental (0.x): attributes and token names may change before 1.0.
MIT licensed.

## Install

```bash
pnpm add @imsus/normal-ui-css
```

```ts
import '@imsus/normal-ui-css'; // tokens + base styles + patterns
import '@imsus/normal-ui-css/themes/govuk.css'; // optional theme: govuk, mcmaster, or usgraphics
```

## How it fits together

The base import ends with a layer declaration: `normal-ui`, then `normal-ui-theme`.
A theme file adds its values and element rules; your own unlayered CSS beats both.
Keep the import order above (base, theme, then component or app styles).

| Import | What |
| --- | --- |
| `@imsus/normal-ui-css` | Tokens, base styles, patterns. Start here. |
| `@imsus/normal-ui-css/tokens.css` | Tokens alone, for layering by hand. |
| `@imsus/normal-ui-css/themes.css` | All three themes combined. |
| `@imsus/normal-ui-css/themes/<id>.css` | One theme (`govuk`, `mcmaster`, `usgraphics`). |
| `@imsus/normal-ui-css/tokens.json` | Every token value, for tooling. |
| `@imsus/normal-ui-css/tokens.stylex` | Tokens as a StyleX module, for StyleX users. |

## Color scheme and theme

`data-color-scheme="light|dark"` forces a color scheme on `<html>` or any element.
Without it, the page follows the device. `data-theme="govuk|mcmaster|usgraphics"`
applies a theme; without it, you get plain Normal UI. GOV.UK is light only.

```html
<html lang="en" data-color-scheme="dark" data-theme="govuk">
```

## Plain HTML and patterns

Write semantic elements and they already look right: `button`, `a`, `label` +
`input`, `fieldset` + `legend`, `details` + `summary`, `table` with `th scope`.
For composite pieces, use the patterns: small `pd-` classes (`.pd-badge`,
`.pd-alert`, `.pd-sheet`) and ARIA roles (`tablist`, `menu`, `tooltip`),
no JavaScript. An agent skill with the full list ships in `skills/`.

## Overriding

Every value is a custom property. Override properties on an element; never edit
the package:

```css
.pd-sheet {
  --canvas: #faf8f2;
}
```

## Browser support

Last 2 Chrome, Firefox, and Safari versions.
