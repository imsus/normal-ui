# Tri-state checkbox

A parent checkbox that shows whether all, none or some of its children are checked. The "some" state is the native `indeterminate` property, which browsers expose as `aria-checked="mixed"`.

**Consumer provides:** the parent label and the child options.

- Checking the parent checks every child; unchecking clears them. Changing a child updates the parent.
- Indent the children under the parent and wrap the set in a `<fieldset>`.
- `indeterminate` can only be set from script; the HTML alone cannot express it.
- The same pattern selects rows in DataTablePage.
