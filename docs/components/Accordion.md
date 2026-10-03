# Accordion

The APG accordion: each section header is a heading containing a `<button aria-expanded aria-controls>`, and each panel is a `role="region"` labelled by its button.

**Consumer provides:** the section titles, their heading level and the panel content.

- Use this instead of `<details>` when the section titles must stay real headings (so screen-reader users can jump by heading), or when only one section may be open at a time.
- The button fills the heading. The state arrow before the title points right when closed and down when open (see Iconography); `aria-expanded` announces it.
- Tab moves between headers. Enter or Space toggles. Optional: Up/Down arrows between headers.
- Use `role="region"` on panels only when there are six or fewer, so the landmarks list stays short.
- Closed panels use `hidden="until-found"`: their text stays findable with the browser's Find in page, and a match opens the panel (the `beforematch` event sets `aria-expanded`). Browsers without it treat the panel as plain `hidden`.
- For simple FAQs, the native `<details name>` (see Details) needs no script.
