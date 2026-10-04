# Grid

An interactive table: `<table role="grid">` where one cell at a time is focusable and the arrow keys move between cells. Use it when cells hold actions or edits; for reading only, use a plain Table.

**Consumer provides:** the data, which columns are editable, and the save handler.

- Roving `tabindex`: the grid is one Tab stop; the last focused cell keeps `tabindex="0"`, all others `-1`.
- Keys: arrows move; Home/End go to the row's ends; Ctrl+Home/End to the first and last cells.
- Editable cells (here Stock) switch to an input on Enter or F2. Enter saves and announces "Stock for Teak cutting board set to 10"; Esc cancels. Focus returns to the cell.
- The focused cell shows a 2px `focus-ring` inside its border.
