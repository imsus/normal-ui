# Radio

A native `<input type="radio">` at 18×18px in a 24px target, `radius-round`, filled with `accent` when selected.

**Consumer provides:** a shared `name` for the group, a `<label>` for each option, and a Fieldset with a `<legend>` around the group.

- Always inside a `<fieldset>` whose `<legend>` asks the question ("Delivery speed").
- Pre-select a sensible default when one exists.
- Arrow keys move between options in a group; Tab leaves the group. Do not override this.
- More than about seven options: use Select.
