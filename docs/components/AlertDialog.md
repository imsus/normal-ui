# Alert dialog

A modal dialog that interrupts to ask about something urgent: `<dialog role="alertdialog">` opened with `showModal()`.

**Consumer provides:** the question, what will happen, and two buttons named with verbs.

- `role="alertdialog"` (instead of the dialog's default role) tells screen readers to read the description straight away. Link it with `aria-labelledby` and `aria-describedby`.
- Put `autofocus` on the safe choice ("Keep editing").
- Use only for confirmations of loss or irreversible actions. Everything else is a normal Dialog, an Alert or a Toast.
- The ProductsPage delete confirmation now uses this role.
