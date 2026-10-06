# File upload

A native `<input type="file">` inside a large dashed drop zone (`label.pd-drop`), with one progress bar per file.

**Consumer provides:** accepted types, size limit, the upload handler and the file list.

- The whole zone is the label, so clicking anywhere opens the file picker and the native button stays keyboard-reachable. Focus rings the zone.
- Dragging a file over it adds `.dragging` (inverted to `highlight`). Dropping is optional; the picker always works.
- State the accepted types and size in words under the prompt.
- List each file with its name, size and a `<progress>` labelled by the name; say "Uploaded" or the reason it failed in text.
