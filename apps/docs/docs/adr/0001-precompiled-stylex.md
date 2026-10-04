# Ship components with StyleX precompiled

`@imsus/normal-ui-react` publishes compiled JS and a static `styles.css` instead of StyleX source, so consumers can install it without adding the StyleX compiler to their build. StyleX users still get first-class overrides: the package exports `tokens.stylex` so their `xstyle` values can reference the same tokens, and everyone else overrides with `className`/`style` or token custom properties.

## Considered Options

- **Ship source**: smaller package and one shared atomic stylesheet for StyleX apps, but every consumer would need the StyleX plugin. Rejected because the system's audience includes people who just want working components.
