# Listbox

A single-select list where every option stays visible: `<ul role="listbox" tabindex="0">` of `role="option"`s, using `aria-activedescendant` for the highlighted option.

**Consumer provides:** a label (`aria-labelledby`), the options and the change handler.

- Selection follows focus: Up/Down move and select, Home/End jump, typing a letter jumps to the next option starting with it.
- Selected option: tick, bold, `highlight` background and an inner focus ring when the list has focus.
- For multiple choice set `aria-multiselectable="true"` and toggle with Space; for most forms, checkboxes are simpler.
- A native `<select>` (or `<select size="6">`) does all of this with no script. Use a custom listbox only when options need rich content.
