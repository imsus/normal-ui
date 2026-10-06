# Mobile bottom sheet

A list of actions that slides up from the bottom edge on phones. It is a `<dialog>` opened with `showModal()`, so focus is trapped and Esc or a tap outside closes it.

**Consumer provides:** a title and up to about six actions.

- Actions are full-width buttons at least 52px tall, inside a `<form method="dialog">` so each button's `value` becomes the dialog's `returnValue`.
- Always include a visible Close button at the bottom. The grab bar is decoration only; do not rely on swiping down.
- Put destructive actions last with "…" when they need confirmation.
- The preview shows the sheet open without a backdrop; in use it opens from Actions with the page dimmed.
