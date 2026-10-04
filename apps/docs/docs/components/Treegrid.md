# Treegrid

A table whose rows nest: `<table role="treegrid">` with `aria-level`, `aria-posinset`, `aria-setsize` and `aria-expanded` on rows.

**Consumer provides:** the parent and child rows and their columns.

- This version focuses whole rows (simplest for reading totals). Up/Down move between visible rows; Right expands a collapsed row; Left collapses it, or moves from a child to its parent; Home/End jump.
- Collapsed children are `hidden`, so they leave the accessibility tree too.
- The state arrow in the first cell mirrors `aria-expanded` (right when collapsed, down when expanded); children are indented.
- If rows need no interaction, a plain table with row groups (`<tbody>` per category and `<th scope="rowgroup">`) is easier for everyone.
