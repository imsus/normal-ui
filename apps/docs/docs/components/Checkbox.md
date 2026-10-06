# Checkbox

A native `<input type="checkbox">` drawn at 18×18px inside a 24px target, filled with `accent` when checked.

**Consumer provides:** the input wrapped in (or linked to) a `<label>` so the whole label is clickable.

- Wrap: `<label><input type="checkbox"> Gift wrap this order</label>`. The label enlarges the target well past 24px.
- Group related checkboxes in a Fieldset with a `<legend>` asking the question.
- Use for independent on/off choices. For one-of-many, use Radio.
- When a choice is disabled, say why in the label text.
