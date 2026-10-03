# Products

A catalogue screen with a collapsible sidebar, a side sheet for editing a product, and a modal dialog that confirms a delete. The sheet is shown open at rest so the preview shows it; in use it opens from Edit or Add product.

**Consumer provides:** the sidebar links, the table rows, the form fields and the save and delete handlers.

Sidebar
- A `<nav aria-label>` with short grouped lists; group names are small uppercase `gray-text` headings. The current item uses `highlight` / `highlight-text` and `aria-current="page"`.
- Hide and show it with a real `<button>` that has `aria-controls` and `aria-expanded`, and says what it will do ("Hide sidebar").
- On narrow screens it stacks above the content.

Side sheet
- A native `<dialog>` opened with `showModal()`, pinned to the right edge, full height, up to 26rem wide. Header with the title and a Close button (`aria-label="Close"`), a scrolling body, a footer with the actions.
- Esc, the Close button, Cancel and a click on the backdrop (`closedby="any"`) all close it. Focus returns to the button that opened it.
- It holds a real `<form method="dialog">`; the submit button's `value` becomes `returnValue`, so one `close` handler covers Save and Cancel.
- It slides in over 0.2s with `@starting-style`, only when the reader has not asked for reduced motion.

Modal dialog
- Use it only to confirm something that cannot be undone. A native `<dialog role="alertdialog">` opened with `showModal()`: focus is trapped, the page behind is inert, Esc cancels.
- The title asks the question with the thing's name ("Delete Teak cutting board?"); the text says what happens; the buttons repeat the verbs ("Keep product", "Delete product"), never "OK" and "Cancel".
- Put `autofocus` on the safe choice. After closing, move focus to something sensible: the Delete button if kept, the first remaining row if deleted.
- Announce the outcome in the polite live region.
