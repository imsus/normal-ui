# Search

Results for one query across types, with filters on the side, sorting, and the query highlighted in each result.

**Consumer provides:** the query, the results, filter options with counts, and sort options.

- Keep the search field at the top with the query still in it.
- Say the count and the query in a heading ("7 results for “batik”") and announce it politely when it changes.
- Filters are checkbox and radio groups in fieldsets, each option with its result count. Apply them immediately and keep a Clear filters link.
- Each result: title as a link, the match wrapped in `<mark>`, and one muted line saying what kind of thing it is.
- For no results, use the EmptyState no-results pattern.
