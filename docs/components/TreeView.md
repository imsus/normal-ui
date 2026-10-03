# Tree view

A hierarchy people can expand and collapse: `role="tree"` of `role="treeitem"`s, with nested `role="group"` lists.

**Consumer provides:** the nested items, which are open, and the selection handler.

- Parent items carry `aria-expanded`; the state arrow shows the same state (right when closed, down when open); leaf items keep an empty space of the same width, so labels line up. The selected item has `aria-selected="true"` and `highlight`.
- Keys: Up/Down move through visible items; Right opens a closed parent or moves to its first child; Left closes an open parent or moves to the parent; Home/End jump; Enter or Space selects.
- One Tab stop (roving `tabindex`).
- For site navigation with only two levels, nested lists of links are simpler; use a tree for file-like browsing.
