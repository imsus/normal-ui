# Mobile list

A grouped list of orders: search, a segmented filter, sticky date headings, rows of at least 64px, and Load more instead of page numbers.

**Consumer provides:** the groups and rows, the filter options and the loader.

- Each row is one link covering the whole row: the name (underlined in `link`), a muted second line, the amount on the right and a `›`.
- The segmented filter is a radio group in a `<fieldset>` with visually hidden inputs over each label; the selected segment inverts to `canvas-text` on `canvas`, and focus shows the ring.
- Date headings are `h2`s that stick under the top bar as the list scrolls.
- Use a Load more button with a count ("Showing 6 of 248"), not infinite scroll, so keyboard and screen-reader users can reach what comes after the list.
