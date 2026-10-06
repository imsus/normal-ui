# 2026 SaaS layout

A workspace layout for SaaS apps that keep a list and the item open from it on screen together: an icon rail for the app's sections, a sidebar listing items, the open item in tabbed main content, a details sidebar about that item, and a status bar along the bottom.

**Consumer provides:** the rail's sections, the list and its views, the tabs and their panels, the details, and the status text.

Layout (desktop first)
- CSS grid with named areas (`rail`, `side`, `main`, `aside`, `bar`) filling the viewport. The page never scrolls; each column scrolls on its own, and the tab bar stays at the top of main.
- Under 1280px the details sidebar becomes a drawer from the right, opened by a Details button in the tab bar. Under 960px the list sidebar becomes a drawer from the left, opened by a Customers button. Under 640px the page scrolls as a whole, the rail becomes a bottom tab bar with visible labels, and the status bar is hidden.
- Both sidebars are popovers (`<nav popover>`, `<aside popover>`). On wide screens CSS shows them in place; on narrow ones they open over the page and close with their own Close button, Esc or a click outside, with no script. Choosing an item in the list drawer closes it and moves focus to main.

Regions
1. Skip link to `<main id="main" tabindex="-1">`.
2. Left rail: `<nav aria-label="Primary">` of icon links. Each icon's name is real text, visually hidden and shown as a tooltip on hover and keyboard focus; on phones it is a visible label under the icon. The current section has `aria-current="page"`. An unread count is drawn on the icon and spoken as part of the name ("Inbox, 3 new"). The account button sits at the foot and opens the account menu. On phones Settings moves into that menu, keeping the tab bar to five items.
3. Sidebar: `<nav aria-label="Customers">` with a view switcher (a menu button) above a list of items, each with an avatar, a name and a one-line preview. The open item has `aria-current="page"` and the highlight.
4. Main: a sticky bar holding the tabs (APG tabs: arrow keys, Home and End), then each tab's panel. The overview shows the item's heading, a grid of cards with image placeholders, notes, and a callout card with an action.
5. Details sidebar: `<aside aria-label="Customer details">` with sections about the open item: a summary, a checklist card, an image, and the people watching it.
6. Status bar: a `<footer>` whose sync message is `role="status"`, with help links on the other side.

Avatars are initials in a circle and are decorative (`aria-hidden`); the name is always beside them. Image placeholders are `role="img"` with a label saying what the picture would show.
