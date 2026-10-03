# Custom select

A real `<select>` styled with `appearance: base-select`, the newest HTML form control update. Opt in with `class="pd-select"`.

**Consumer provides:** a label, the options, and optional extra text per option in `<small>`.

- It is still a native select: keyboard, typeahead, form submission and screen-reader announcements are the browser's own. No listbox script is needed.
- A `<button><selectedcontent></selectedcontent></button>` as the first child mirrors the chosen option's full content, `<small>` included.
- Styled parts: `::picker(select)` for the list (a 1px `control-border` box on `canvas`), `::picker-icon` (the state arrow, flipped up while `:open`), `::checkmark` (✓), and options at least 32px tall that highlight on hover and focus.
- Support: Chrome and Edge 135+, Safari 27+. Other browsers ignore the rule inside `@supports` and show the plain native select, and `<small>` text still appears in each option.
- Keep option content to text. Put images or links elsewhere.
