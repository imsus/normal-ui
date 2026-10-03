# Mobile article

A help article at phone width, with a back link in the top bar and no tab bar so reading is uninterrupted.

**Consumer provides:** the article, the back destination and the feedback handler.

- The top bar's back link names where it goes ("‹ Help") and is at least 48×48px.
- Body text goes up to 1.0625rem with line height 1.6 on phones; the `h1` is 1.75rem.
- Quotes get a 3px `rule` bar on the start edge so they read as quotes without the 40px desktop indent.
- Tables sit in an `overflow-x: auto` wrapper and keep to two or three columns.
- FAQ items are full-width `<details>` rows 48px tall with a +/− sign in place of the small triangle.
- End with a yes/no feedback form; after answering, replace it with a thank-you and move focus there.
