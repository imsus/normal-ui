# Input group

A `<label>` above a row of joined members on `field`, bordered in `control-border`, typed text in `field-text` at 16px: inputs and selects that grow, addons in their own bordered boxes, and buttons.

**Consumer provides:** the visible label, the members in row order, a `label` for each input and select when the group holds two or more, and any hint or error text.

- With one input or select the visible label points at it, like a TextField. Give the member no `label` of its own: it would override the visible label.
- With two or more the row is a labelled group naming the visible label, and each input and select names itself through a `label` prop, rendered as `aria-label`. A missing one is a `console.error` in dev.
- Addons are static text or icons (`https://`, `kg`, `$`) in their own bordered boxes, never inset inside the input's border. A text addon is read through the adjacent input's description ("Website, edit text, https://"); an icon-only addon is `aria-hidden` and adds nothing.
- The group's `error` sets `aria-invalid` on every input and select, and the error and hint are linked from each member with `aria-describedby`. Native checks double one member's border on their own, which is intended.
- Only the focused member shows its ring, lifted above its neighbours; an invalid member lifts too, so its doubled border stays visible. Addons and buttons never change colour for invalid: the written error carries the meaning.
- The row never wraps. Outside forms (a search box in a toolbar), `layout="inline"` puts the label beside the row.
- A group-level `disabled` disables every member; a single member can still be disabled on its own.
