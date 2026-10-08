---
"@imsus/normal-ui-css": minor
"@imsus/normal-ui-react": minor
---

Logical properties throughout (good-css 1.2): every directional `margin`, `padding`, `border`, `inset` and offset is now `-block`/`-inline`, and four-value shorthands are `-block`/`-inline` pairs. Identical rendering in left-to-right; right-to-left layouts now mirror correctly. The `sub`/`sup` offsets stay physical with a reason, and the select arrow keeps its `:dir(rtl)` override until P2.3.
