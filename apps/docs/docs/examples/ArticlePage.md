# Article

A reading page: site header, breadcrumb, one `<main>` of prose with a numbered list, quote, data table and FAQ, then a footer. It uses no classes for styling beyond layout; the elements do the work.

**Consumer provides:** the landmarks (`<header>`, `<nav aria-label>`, `<main id>`, `<footer>`), the article content, and page-level layout CSS.

- Start every page with a skip link to `#main`. It stays off-screen until focused.
- Mark the current nav item with `aria-current="page"`.
- Constrain reading width on `<main>` to about 40rem (roughly 75 characters of `body`).
- One `h1`, then `h2`/`h3` in order. Put the date and reading time in `small` with `gray-text`.
- Use `mark` for the one fact a skimming reader must not miss, at most once per section.
- Give the FAQ's `<details>` a shared `name` so only one opens at a time.
- Row headers in tables use `<th scope="row">`; numbers align right with `tabular-nums`.
