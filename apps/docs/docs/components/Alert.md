# Alert

A page-level message in a bordered box: `<div class="pd-alert" data-kind="info|success|warning|error">`.

**Consumer provides:** the message, starting with its kind in words, and a next step where there is one.

- Start every alert with the kind in bold: "Note:", "Done:", "Warning:", "Error:". The border also changes (1px, 2px, 2px dashed, 3px), so no alert depends on colour.
- Roles: `role="alert"` only for errors that appear after an action; `role="status"` for success messages that appear after an action; nothing (or `role="note"`) for messages present on load.
- Place alerts at the top of the region they are about. For a form, use the error summary instead (see CheckoutPage).
- Give a way forward: a link or a sentence saying what to do.
