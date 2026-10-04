# Hint popover

A tooltip-like hint built from two new platform features: `popover="hint"` (a popover that does not close other open popovers) and `interestfor` (shows it when the button is hovered or focused, and hides it when interest moves away).

**Consumer provides:** a trigger button with an accessible name, and one sentence of hint.

- The trigger also has `popovertarget`, so a click or tap toggles the hint everywhere, including browsers without interest invokers.
- The hint sits above the trigger with anchor positioning and flips below if there is no room. Esc closes it.
- Drawn inverse (`canvas` on `canvas-text`) like Tooltip.
- Support: `interestfor` is in Chrome and Edge 142+ only; Firefox and Safari use the click fallback. For hints that must appear on focus in every browser today, use Tooltip.
