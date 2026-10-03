# Table of contents

An "On this page" list of links that highlights the section in view, with no script: `scroll-target-group: auto` turns the links into scroll markers, and `:target-current` styles the current one.

**Consumer provides:** the section headings with `id`s and a `<nav class="pd-toc" aria-label="On this page">` with an `<ol>` of links.

- Everywhere, it is an ordered list of in-page links.
- Where supported, the link for the section being read is `canvas-text`, bold, with a 2px underline.
- The highlight is visual only; it does not set `aria-current`. That is fine for a reading aid, because every link still works and names its section.
- Support: `scroll-target-group` and `:target-current` are Chromium only (Chrome 140+) and experimental. Other browsers show the plain list.
