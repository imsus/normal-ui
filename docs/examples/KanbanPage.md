# Kanban

A task board with four columns. Cards move with a "Move to" select, which works by keyboard and screen reader, instead of drag and drop.

**Consumer provides:** the columns, the cards (title, label, owner, due date) and the move handler.

- Each column is a `<section>` with an `h2` and a card count; cards are an `<ol>` of `<article>`s with an `h3` title.
- Every card has a labelled "Move to" `<select>`. Drag and drop may be added on top, but never as the only way to move a card (WCAG 2.5.7).
- After a move, keep focus on the moved card's select, update the counts and announce "… moved to Review" in a polite live region.
- Due dates are words ("Due today", "Overdue"), not red text. Done cards say "Done 25 Sep" instead of a due date; they are not struck through, which would hurt legibility.
- Labels are bold text, not coloured chips.
- Columns keep a 13rem minimum; the board scrolls sideways inside its own container on small screens.
