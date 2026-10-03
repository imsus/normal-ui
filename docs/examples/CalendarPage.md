# Calendar

A month view built on a `<table>`, with an agenda list beside it.

**Consumer provides:** the month, the events and the navigation handlers.

- Use a real table: day names as `<th scope="col">` with `<abbr>` for the short form, one `<td>` per day.
- Each day number is a `<time datetime>` with the full date in visually hidden text, so screen readers hear "Monday 28 September", not "28".
- Mark today with `aria-current="date"`, a 2px `canvas-text` outline and the word "Today". Days outside the month use `gray-text`.
- Events are links inside the cell, with the time first. Keep them short; the agenda list gives the full title.
- Month navigation is plain buttons that name the target month ("‹ August"), plus Today and New event.
- On narrow screens the agenda stacks below the grid; the agenda alone is a complete way to read the schedule.
