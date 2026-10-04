# Breadcrumb

A `<nav aria-label="Breadcrumb">` holding an `<ol>` of links, separated by a `›` that screen readers skip.

**Consumer provides:** the trail from the top level to the current page.

- The last item is the current page: give it `aria-current="page"`; it is shown bold.
- Keep labels to the pages' real titles. Do not include the site name as the first crumb unless it is a link home.
- Use on pages two or more levels deep. On phones, show only the parent as a back link instead.
