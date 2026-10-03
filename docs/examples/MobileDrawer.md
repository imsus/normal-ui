# Mobile drawer

A navigation drawer that slides in from the start edge, for apps with more sections than a four-item tab bar can hold. It is a modal `<dialog>`.

**Consumer provides:** the grouped links and the current page.

- Open it from a button labelled "Menu" (a word, or an icon with that accessible name) at the start of the top bar.
- Close with the × button (labelled "Close menu"), Esc or a tap outside; focus returns to Menu.
- Group links under small uppercase headings; rows are 48px tall; the current page uses `highlight` and `aria-current="page"`.
- Prefer a bottom tab bar when there are four or fewer top-level sections; use the drawer for the rest.
- The preview shows the drawer open without a backdrop; in use it opens modally.
