# Menubar

An application-style menu bar: `role="menubar"` holding `role="menuitem"`s that open `role="menu"` popups, with `menuitemcheckbox` and `menuitemradio` items.

**Consumer provides:** the menus, their items, shortcuts and handlers.

- Only use this for app-like editors where people expect desktop menus. For site navigation use links; for a few actions use MenuButton.
- Keys: Left/Right move along the bar (and switch open menus); Down or Enter opens; Up/Down move in the menu; Home/End jump; Enter or Space activates; Esc closes and returns to the bar; Tab leaves the menubar.
- Radio items sit in a `role="group"` and show a tick when `aria-checked="true"`; checkbox items toggle their tick.
- Show shortcuts in `<kbd>` and declare them with `aria-keyshortcuts`.
