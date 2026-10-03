# Combobox

An editable combobox with list autocomplete: a text `<input role="combobox">` controlling a `role="listbox"` popup of suggestions.

**Consumer provides:** the label, the option list (or a search function) and what to do on selection.

- Attributes: `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` pointing at the listbox, and `aria-activedescendant` naming the highlighted option while focus stays in the input.
- Keys: Down opens and moves, Up moves back, Enter picks, Esc closes (a second Esc clears), typing filters. The number of matches is announced politely.
- The highlighted option gets `highlight` and a focus ring; the chosen one a tick.
- If the list is short and fixed, use a native `<select>` instead. A `<datalist>` also works but cannot be styled or announced as consistently.
