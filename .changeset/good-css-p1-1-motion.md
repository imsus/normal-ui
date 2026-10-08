---
"@imsus/normal-ui-css": minor
"@imsus/normal-ui-react": minor
---

Motion is opt-in per rule (good-css 6.1): the global `prefers-reduced-motion` kill switch is gone, and the spinner runs only inside `no-preference`. No visual change at default settings. If you relied on the kill switch to stop your own CSS from animating, add your own `reduce` override.
