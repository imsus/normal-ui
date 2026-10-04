// Generated from themes/<id>/tokens.json by scripts/build-tokens.mjs. Do not edit.
// The tokens each theme adds, as var() references. They only have a value inside
// [data-theme="<id>"]; elsewhere they are unset.
import * as stylex from '@stylexjs/stylex';

/** Added by the GOV.UK theme. */
export const govuk = stylex.defineConsts({
  /** A link under the pointer, with a 3px underline. */
  "linkHover": "var(--link-hover)",
});

/** Added by the US Graphics theme. */
export const usgraphics = stylex.defineConsts({
  /** Top-left highlight of a bevelled button. Decorative; the border carries the 3:1 edge. */
  "bevelLight": "var(--bevel-light)",
  /** Bottom-right shadow of a bevelled button and the sheet's drop shadow. */
  "bevelShadow": "var(--bevel-shadow)",
});
