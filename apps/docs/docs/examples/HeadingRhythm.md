# Heading rhythm

The same heading levels in the two rhythm contexts. Set the context once on a container; every heading, paragraph and list inside reads it from custom properties.

**Consumer provides:** `class="pd-app"` on application UI (usually `<body>`), and `class="pd-content"` on any long-form text inside it. Pages with no class get content rhythm.

| | Content (default, `.pd-content`) | App (`.pd-app`) |
| --- | --- | --- |
| Unit | one line, 1.5rem (24px) | same |
| h1 / h2 / h3 / h4 / h5 / h6 | 2 / 1.5 / 1.17 / 1 / 0.875 / 0.875 rem | 1.5 / 1.125 / 1 / 0.9375 / 0.875 / 0.875 rem |
| Heading line-height | `round(up, 1.2em, 0.375rem)`: snaps to quarter lines | `round(up, 1.2em, 0.25rem)` |
| Space above a heading | h2 1.5 lines, h3–h6 1 line; none when it is the first child | none; the parent's `gap` decides |
| Space below a heading | half a line, so it sits closer to its own text | none |
| Space after a paragraph, list, table | one line, below only (no collapsing surprises) | none |
| Body margin | the browser's 8px | 0 |

- Use headings in order in both contexts; app headings are smaller, not skipped.
- In app UI, space things with `.pd-stack` (a flex column with `--pd-stack-gap`) and `.pd-cluster` (a wrapping row with `--pd-cluster-gap`), or your own grid with `gap`.
- A help article, changelog or empty-state message inside an app gets `.pd-content` and its full rhythm back.
- Tick "Show the 24px line grid" to see body lines sit on the grid. Headings snap to quarter lines, so text keeps returning to the grid after them.
