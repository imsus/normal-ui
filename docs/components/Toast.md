# Toast

A brief confirmation in the corner, placed in the top layer with `popover="manual"` and announced through `role="status"`.

**Consumer provides:** a short past-tense message and, optionally, one action such as Undo.

- Use for confirmations of what the person just did ("Changes saved", "Order archived"). Errors that block work belong in an Alert or next to the field.
- A toast with an action stays until dismissed; one without an action may hide after at least 6 seconds, and hover or focus pauses the timer (WCAG 2.2.1).
- Never move focus to a toast. It is announced politely; keyboard users can reach it with Tab after the current control.
- Drawn in `canvas` on `canvas-text` with a Dismiss button labelled for screen readers.
