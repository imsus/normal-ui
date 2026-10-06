---
"@imsus/normal-ui-css": patch
"@imsus/normal-ui-react": patch
---

Define the custom properties StyleX generates for the tokens. Code that compiled StyleX against `tokens.stylex` (including the React components' `styles.css`) got unset `var(--x…)` references, so token-based spacing, colours and radii fell back to nothing.
