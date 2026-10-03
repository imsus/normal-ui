# App shell with sidebar

The main app layout: a sticky top bar, a sidebar of grouped links, the page in `<main>`, a footer, and every region that belongs to the whole app rather than one page.

**Consumer provides:** the brand, navigation groups, search, account menu and page content.

Layout
- CSS grid with named areas (`notice`, `offline`, `top`, `side`, `main`, `foot`). The sidebar is sticky under the top bar and scrolls on its own.
- The sidebar is a `<nav popover>`. On wide screens CSS shows it in place; under 800px it hides and the ☰ button (`popovertarget`, labelled "Menu") opens it over the page. It closes with its own Close menu button, Esc or a click outside, with no script.
- The top bar sets `--pd-sticky-top`, which the stylesheet turns into `scroll-padding`, so a focused element is never hidden under the bar (WCAG 2.4.11).
- `<main id="main" tabindex="-1">` is the skip link's target and where focus goes after a region is dismissed.

Global regions (one of each per app, direct children of `<body>`, in this order)
1. Skip link.
2. Service notice: a labelled `<section>` with a 2px dashed bottom border, a message that starts with its kind, and a Dismiss button. Not `role="alert"`: it is present on load.
3. Offline status: `role="status"`, inverted, shown from the `online` and `offline` events.
4. Top bar, sidebar, main, footer.
5. Live announcer: an empty `role="status"` that exists from page load; write short messages into it.
6. Toast: one `popover="manual"` for the whole app (see Toast). It hides after 6 seconds unless hovered or focused.
7. Session timeout warning: a `role="alertdialog"` shown before an automatic sign-out, with "Stay signed in" first (WCAG 2.2.1). Open it from the account menu to preview.

Popovers and dialogs live in the browser's top layer, so none of this needs `z-index`.
