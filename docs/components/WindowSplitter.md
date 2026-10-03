# Window splitter

A movable divider between two panes: a focusable `role="separator"` with `aria-valuenow` (the first pane's size in percent), `aria-valuemin`, `aria-valuemax` and `aria-controls`.

**Consumer provides:** the two panes, the limits and a label naming what is resized.

- Keys: Left/Right change the size by 5%; Home/End go to the limits; Enter collapses the first pane to its minimum and restores it.
- Pointer: drag the divider. It is 12px wide with a visible grip and a hover fill.
- Remember the size per person if the layout is used every day.
- On narrow screens stack the panes instead and hide the divider.
