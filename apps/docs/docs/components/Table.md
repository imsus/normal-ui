# Table

A `<table>` with collapsed 1px `rule` borders and 4px 8px cell padding, replacing the default 2px spacing and 1px padding.

**Consumer provides:** a `<caption>`, header cells as `<th scope="col">` or `scope="row"`, and the data.

- Tables are for data with rows and columns, never for layout.
- Always give a caption; it names the table for screen-reader table lists.
- Align numbers to the right with `text-align: end` and `font-variant-numeric: tabular-nums` on those cells.
- Wide tables go in a wrapper with `overflow-x: auto` so the page itself never scrolls sideways.
- State words ("Shipped") go in the cell as text, never as colour alone.
