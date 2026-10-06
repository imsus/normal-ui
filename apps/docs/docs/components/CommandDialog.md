# Dialog

Opening and closing a dialog with invoker commands: `commandfor` names the target and `command` names the action (`show-modal`, `close`, `request-close`, `toggle-popover`, or a custom `--name`). No click handlers are needed.

**Consumer provides:** the dialog, and a listener for any custom command.

- Built-in commands open and close the dialog, move focus into it, and return focus to the invoker when it closes.
- Custom commands start with `--` ("--delete"). The dialog gets a `command` event with `event.command`; handle the real work there.
- The dialog keeps `role="alertdialog"`, `aria-labelledby` and `aria-describedby` (see AlertDialog).
- Support: Chrome and Edge 135+, Firefox 144+, Safari 26.2+. The preview includes a 6-line fallback for older browsers that maps the same attributes to `showModal()` and `close()`.
