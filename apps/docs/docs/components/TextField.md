# Text field

A `<label>` above an `<input>` or `<textarea>` on `field`, bordered in `control-border`, typed text in `field-text` at 16px.

**Consumer provides:** a visible `<label for>`, the input's `id`, `type`, `autocomplete` where it applies, and any hint or error text.

- Always a visible label. A placeholder is an example value ("name@example.com"), never the label; it disappears as soon as someone types.
- Placeholder text is `placeholder` (5:1), not faded by opacity.
- Errors: write what went wrong and how to fix it under the field and connect it with `aria-describedby`. Native checks (`required`, `type="email"`, `pattern`) double the border through `:user-invalid` once the person has interacted; for errors your code finds, set `aria-invalid="true"`. Do not rely on a red border.
- Textareas grow with what is typed, from 3 lines to 12, then scroll.
- Stack label, field and hint with a small gap; keep the field at least 24px tall. Outside forms (a search box in a toolbar), `layout="inline"` puts the label beside the field.
- Textareas can still be resized, vertically only.
- `aria-errormessage` (WAI-ARIA 1.3 draft) may be added alongside `aria-describedby`, but do not rely on it alone yet.
