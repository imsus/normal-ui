# Slider

A native `<input type="range">` with its value shown in words beside it.

**Consumer provides:** label, min, max, step and a sentence that uses the value.

- Always show the value as text (`<output for>`); a thumb position alone is not readable.
- Set `aria-valuetext` when the number needs a unit or meaning ("5 items"), so screen readers say that instead of "5".
- Arrow keys move one step, Page Up/Down ten steps, Home/End to the ends; all native.
- The thumb and track use `accent`. The whole control is at least 24px tall.
- If an exact number matters more than a rough setting, use a number field (see Spinbutton).
