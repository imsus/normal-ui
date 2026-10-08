---
"@imsus/normal-ui-css": minor
"@imsus/normal-ui-react": minor
---

Focus without `outline: none` (good-css 5.1): the redundant `:focus:not(:focus-visible)` reset is gone, and tree items, select options, GOV.UK choices and the React tree keep their rings through `:focus-visible` with transparent fallbacks that forced-colors mode can repaint. No visual change.
