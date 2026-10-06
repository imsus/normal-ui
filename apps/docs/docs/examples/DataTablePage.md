# Data table

An orders table with search, a status filter, sortable columns, row selection with a bulk action, and pagination.

**Consumer provides:** the rows, the sort and filter logic, the bulk actions and the page count.

- Wrap search and filters in `<search>` with visible labels. Put the export button at the end of that row.
- Sortable headers contain a `<button>`; the sorted column's `<th>` carries `aria-sort`, and a small ▲/▼ shows direction. Announce the new order through a polite live region.
- Each row checkbox is labelled ("Select order 1048"). The header checkbox selects the page and shows the indeterminate state. Selected rows use `highlight`.
- Show the selection count in words beside the bulk action; disable the action while nothing is selected.
- Align numbers right with `tabular-nums`. Status is plain text.
- Wrap the table in `overflow-x: auto` so it scrolls on its own on narrow screens.
- Pagination is a `<nav aria-label>` with the range in words ("Showing 1–8 of 248"); the current page has `aria-current="page"`.
