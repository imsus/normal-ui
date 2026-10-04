# Command palette

A searchable list of every place and action, opened with Ctrl+K (Cmd+K on a Mac): type a few letters, press Enter. Like cmdk, built from a modal `<dialog>` and the APG combobox pattern. The docs' "Search docs" button in the top bar is one.

**Consumer provides:** the commands, each with a `label` in words and either an `href` or an `onSelect`; a `group` to list them under; and a visible button that opens it, since a shortcut alone cannot be discovered.

- Focus stays in the input. Up and Down move through the results (wrapping), Enter runs the highlighted one, Ctrl or Cmd + Enter opens a link in a new tab, Esc closes. The pointer highlights what it is over; a click runs it.
- The first match is highlighted as you type, so a few letters and Enter is enough.
- Every word typed must appear in the label, `keywords`, `group` or `detail`. Results are ranked: an exact label, then a label that starts with the query, then a word in it that does. Groups follow their best result. Put code names, synonyms and old names in `keywords`.
- `detail` is a short second label at the end of the row (`gray-text`; full colour on the highlighted row, for contrast).
- The match count is announced politely ("3 pages"); "Nothing matches" is shown in words.
- On close, focus returns to whatever had it before: the button, or the page if the shortcut opened it.
- `shortcut="k"` binds Ctrl+K and Cmd+K on the whole page. Give the opening button `aria-keyshortcuts="Control+K Meta+K"`. Only one palette on a page should own the shortcut.

Accessibility
- The dialog and the input are both named by `label` ("Search the docs"). The results are a `role="listbox"` of `role="option"` rows in `role="group"`s labelled by their headings; the highlighted row is `aria-selected` and named by `aria-activedescendant`.
- The keyboard hints at the bottom are hidden from screen readers, which announce the combobox's own keys.
- Commands are run, not chosen, so rows have no checkmark column.
