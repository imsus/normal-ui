# Tooltip

A short hint that appears above its trigger on hover and on keyboard focus, and hides again on Esc (WCAG 1.4.13).

**Consumer provides:** the trigger (a focusable control) and one sentence of hint text.

- Link the trigger to the tip with `aria-describedby`, so screen readers read the hint after the control's name.
- The tip stays visible while the pointer is over the trigger or the tip, and while the trigger has focus.
- Never put the only label or anything interactive in a tooltip. If the hint matters, show it as text under the field instead.
- Drawn in `canvas` on `canvas-text`, the inverse of the page, so it reads as a layer.
