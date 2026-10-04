# Spinbutton

A native `<input type="number">` (role spinbutton) with large − and + buttons, joined into one control with ButtonGroup.

**Consumer provides:** label, min, max, step and the limit in words.

- The field itself takes typing and Up/Down arrows; the buttons are extra 44px square targets for touch (the field stretches to their height), labelled "Decrease quantity" and "Increase quantity".
- Buttons are disabled at the limits, and the limits are stated in text.
- Use `inputmode="numeric"` for a number keypad on phones.
- For values that are really identifiers (postcodes, card numbers), use a text input, never a number input.
