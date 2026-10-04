# App shell with top bar

A layout with no sidebar: a sticky top bar with horizontal navigation, a page header with its actions, centred content up to 72rem, and a footer.

**Consumer provides:** up to six top-level links, the page title and actions, and content.

- Use it when there are six or fewer top-level sections. With more, use AppShellSidebar.
- The current section is `canvas-text`, bold, with a 3px underline, and `aria-current="page"`.
- Under 640px the links move to their own row and scroll sideways inside it rather than wrapping into a tall header.
- The page header puts the `h1` on the left and at most two actions on the right, above a `rule` line.
- The same global regions apply as in AppShellSidebar; this example shows the offline status and announcer.
