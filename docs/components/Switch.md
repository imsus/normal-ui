# Switch

A native `<input type="checkbox" role="switch">`, drawn 44×24px with a sliding knob. Screen readers announce it as a switch that is on or off.

**Consumer provides:** a `<label for>` that names the setting, and optional help text linked with `aria-describedby`.

- Use a switch for a setting that takes effect immediately. Inside a form that is saved with a button, use a plain Checkbox.
- The label names the setting, not the state: "Holiday mode", not "Turn holiday mode on".
- On: `accent` track with a `canvas` knob on the right. Off: `field` track with a `canvas-text` knob on the left. Position and fill both change, so it never relies on colour alone.
- Disabled switches get a dashed border; say why in the label.
- Safari's native `<input type="checkbox" switch>` also works with this styling if you add `role="switch"`.
