# Button group

Buttons joined edge to edge into one control: neighbours share a single 1px `control-border` line and only the outer corners keep `radius-control`.

**Consumer provides:** the buttons, and a `label` when the group needs a name of its own.

- Use it for a few actions or toggles that belong together: Bold / Italic / Underline, List / Grid, − quantity +. Two to five items; more than that is a Toolbar or a Select.
- Give it a `label` ("Text style", "View") when the buttons only make sense together. It becomes a labelled `role="group"`, and screen readers announce the name as focus enters. Leave it off when the group is only visual, as in Spinbutton, where the field's own label says what it is.
- Every button keeps its own label, written as a verb or a value. A pressed toggle (`<Button pressed>`) inverts to `canvas` on `canvas-text`, so the current choice shows by fill as well as being announced.
- For one-of-many choices that act at once (a view switcher), use pressed toggles and keep exactly one pressed. For a choice submitted with a form, use Radio instead.
- The group adds no keyboard handling: each button stays its own Tab stop. Inside a Toolbar, the toolbar's arrow-key movement crosses into and out of the group.
- The item under the pointer, a pressed toggle and the focused item are lifted above their neighbours, so the darker border and the focus ring are never hidden by the overlap.
- `<Button>` joins the group by itself. Anything else (an input, a link styled as a button) takes `buttonGroupItem.item` from the component.
