# Tabs

The ARIA tabs pattern: a `role="tablist"` of `<button role="tab">`s, each controlling a `role="tabpanel"`.

**Consumer provides:** the tab labels, the panels and a label for the tablist.

- The selected tab has `aria-selected="true"`, a 3px `canvas-text` underline and bold text. Hover shows a thinner `control-border` underline.
- Keyboard: Tab enters the tablist on the selected tab and then leaves for the panel; Left/Right arrows move and select; Home/End jump to the ends. Only the selected tab is in the tab order (`tabindex="-1"` on the others).
- Panels are focusable (`tabindex="0"`) so keyboard users can reach content without controls.
- Use tabs for 2–6 peer views of one thing. For steps in order, use Stepper; for page navigation, use links.
- The script is in the preview: copy it, it is 15 lines.
