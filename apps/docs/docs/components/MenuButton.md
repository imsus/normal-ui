# Menu button

The APG Menu Button: a button with `aria-haspopup="menu"` and `aria-expanded` that opens a `role="menu"` of `role="menuitem"` actions. The menu is a `popover="auto"`, so it sits in the top layer, anchors under the button and closes on an outside click without script.

**Consumer provides:** the button label and the actions.

- Keys on the button: Enter, Space or Down opens the menu and focuses the first item; Up opens it on the last item.
- Keys in the menu: Up/Down move between items and wrap; Home/End jump to the ends; typing a letter jumps to the next item starting with it; Enter or Space activates the item and closes the menu; Esc closes it and returns focus to the button; Tab closes it and moves on.
- Items are not in the tab order (`tabindex="-1"`): the menu is one stop, reached with the arrow keys. The focused item is highlighted in `highlight`, with the focus ring for keyboard users.
- Items are buttons, or links with `role="menuitem"` when they go somewhere. Activating any item closes the menu and returns focus to the button.
- Put destructive actions last, after a `role="separator"`, and end their label with "…" when they open a confirmation.
- Where anchor positioning is not supported the menu opens centred; it still works.
- For site navigation, use links in a disclosure (a button with `aria-expanded` and no menu roles) instead: people expect Tab, not arrows, in navigation.
