---
"@imsus/normal-ui-css": minor
"@imsus/normal-ui-react": minor
---

Colour pipeline (good-css 1.3, 1.4): tokens are authored in `oklch()` (grays with a `none` hue) and generated into one block, each colour a single `light-dark()` declaration with `color-scheme: light dark`; `data-color-scheme` only sets the scheme. The contrast gate parses any CSS colour, evaluates `color-mix()` and aliases, and fails out-of-gamut values; all pairs hold their previous ratios. Plain selects keep the data-URI arrow: `base-select` would size the button to the selected option instead of the widest one, reflowing surrounding UI (`.pd-select` stays the opt-in customizable select). Every colour renders the same sRGB value; the look is unchanged.
