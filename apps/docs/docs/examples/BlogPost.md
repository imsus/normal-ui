# Blog post

A long-form post for a journal or blog, using every text element in context. It uses no classes for styling beyond layout; the elements do the work.

**Consumer provides:** the landmarks (`<header>`, `<nav aria-label>`, `<main id>`, `<footer>`), the post as an `<article>` labelled by its `h1`, and page-level layout CSS.

- Keep the post to about 40rem wide (roughly 75 characters of `body`).
- Put the byline in `small` with `gray-text`: author as a link with `rel="author"`, date in `<time datetime>`, reading time.
- A lead paragraph may be one step larger (1.17rem). Only the first paragraph, and never instead of the `h1`.
- Use `mark` for the one fact a skimming reader must not miss, at most once per section.
- Charts and photos go in a `figure` with a `figcaption`; give an SVG chart `role="img"` and a `<title>` that states the data.
- Pull quotes are a `blockquote` in a `figure`, with the speaker in the `figcaption`.
- Footnotes: a superscript link to a numbered list at the end, labelled by its heading, with a link back to the text from each note.
- Corrections use `del` and `ins` so readers see what changed.
- Related posts go in an `aside` after the article, labelled by its own heading.
