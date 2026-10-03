# Toolbar

A group of controls for one target: `role="toolbar"` with an `aria-label`, holding toggle buttons (`aria-pressed`) and ordinary buttons.

**Consumer provides:** the controls, their labels and what they act on (`aria-controls`).

- The toolbar is one Tab stop. Left/Right move between controls, Home/End jump to the ends (roving `tabindex`).
- Toggle buttons use `aria-pressed`; pressed ones invert to `canvas` on `canvas-text`, so state is shown by fill as well as announced.
- Icon-like buttons (B, I, U) are square buttons and carry their full name in visually hidden text.
- Declare shortcuts with `aria-keyshortcuts` and make them work in the target (Ctrl+B in the field).
- Join related toggles into a labelled ButtonGroup ("Text style"); the arrow keys move through the group's buttons like any other control. Separate a group from unrelated controls with a `role="separator"`.
