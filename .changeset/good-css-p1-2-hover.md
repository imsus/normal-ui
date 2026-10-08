---
"@imsus/normal-ui-css": minor
"@imsus/normal-ui-react": minor
---

Hover styles only apply where hover exists (good-css 5.2): every `:hover` rule now sits inside `@media (hover: hover) and (pointer: fine)`, so taps on touch screens no longer leave hover states stuck. Every pressable also has a visible `:active` state. No change at rest on devices with a fine pointer.
