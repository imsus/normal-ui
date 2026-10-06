# Select

A native `<select>` on `field` with a `control-border`, 16px text and the browser's own option list. Every single-line `<select>`, hand-written or React, shows the system's state arrow instead of the browser's (flipped up while the list is open), with 8px of space after it, so it matches MenuButton and CustomSelect. `<select multiple>` and `<select size>` lists keep their native look, and forced-colours mode keeps the native arrow.

**Consumer provides:** a visible `<label for>`, an `id`, the options, and `autocomplete` where it applies.

- Keep the browser's popup. Do not replace it with a custom listbox; the native one works with screen readers, touch and zoom.
- In forms the label sits above the field. In toolbars, filter rows and top bars use `layout="inline"` to put it beside the field on one line (the docs theme switch uses this).
- Use for one choice out of many (eight or more). For fewer, Radio shows every option at once.
- Avoid a "Choose…" first option that submits as a value; use `required` with an empty-value placeholder option instead.
