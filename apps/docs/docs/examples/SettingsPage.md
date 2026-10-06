# Settings

Settings split into tabs, with switches that save immediately, a profile form with a logo upload, and a clearly separated danger zone.

**Consumer provides:** the settings, their save handlers and the section names.

- Each setting is a row: label and one-line explanation on the left, the Switch on the right. Switches save as soon as they change and announce "New orders off. Saved."
- Text fields and uploads are saved with a button, because a half-typed shop name should not go live.
- Destructive actions sit last, in a 2px dashed box headed with what they do. The button ends in "…" and opens a confirmation dialog.
- Remember the open tab in the URL (`#notifications`) so a reload keeps it.
