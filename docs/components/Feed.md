# Feed

A scrolling list of articles that grows as people read: `role="feed"` containing focusable `<article>`s with `aria-posinset` and `aria-setsize`.

**Consumer provides:** the articles and a loader.

- Each article is focusable (`tabindex="0"`), labelled by its heading and described by its body.
- Set `aria-setsize="-1"` when the total is unknown; set the real number when it is known.
- Page Down and Page Up move focus between articles. Tab moves into an article's own links and buttons.
- While loading, set `aria-busy="true"` on the feed and clear it after adding the new articles.
- Always offer a Load more button too; never rely on infinite scroll alone, or the footer becomes unreachable.
