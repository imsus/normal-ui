# Classifieds home

The stress test: a dense local-classifieds homepage for a fictional site, Pasar Warga (Bandung), in the familiar plain-classifieds layout. It is built only from Normal UI: system font, blue underlined links, one inverse button, rules instead of boxes, no images, and no colour other than the tokens.

**Consumer provides:** the area, categories, calendar and links.

Layout
- Body is a grid with named areas. Wide screens get three columns (13rem rail, categories, 11rem rail); phones get one.
- On phones the order is brand, Post, search, categories, then the calendar and help links, then other areas.
- The DOM follows the phone order, so on wide screens focus moves: left rail, then categories, then the lower left rail, then the right rail. The main content comes before secondary links.
- Categories use CSS multi-column (`columns: 15rem 3`) with `break-inside: avoid`, so short and long sections stack tightly and read top to bottom, column by column, exactly as the DOM.
- Long category lists split into 2 or 3 grid columns inside their section. Every gap is `gap`; the page is in `.pd-app` rhythm, with `.pd-stack` for the rails.

Details
- "Post an ad" is the only filled element (`canvas` on `canvas-text`), because it is the one action that matters.
- Search is a `<search>` landmark with a visible label and a category select.
- The event calendar is a real table. Each day is a link named in full ("Events on Wednesday 30 September"), and today has `aria-current="date"` and a 2px outline.
- Category headings are `h2` links under one `h1` (the area), so screen-reader users can jump by heading.
- Links keep their underline, even in dense lists, and get extra vertical padding on touch screens.
