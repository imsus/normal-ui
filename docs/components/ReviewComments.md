# Review comments

Tracked changes and comments in a text, using the review roles from the WAI-ARIA 1.3 draft: `role="suggestion"` around a `<del>`/`<ins>` pair, `role="mark"` on commented text, `role="comment"` for the note, and `aria-details` linking the two.

**Consumer provides:** the text, the suggestions and the comments with author and time.

- ARIA 1.3 is still a W3C draft and screen-reader support for these roles varies, so each change also says what it is in visually hidden text ("Suggested deletion:", "Suggested insertion:").
- Deletions are `gray-text` with a 2px line-through; insertions are underlined on `highlight`. Neither relies on colour alone.
- `aria-details` points from the highlighted text to its comment; the comment is labelled with its author.
- `aria-description` (also ARIA 1.3) adds a hint to the Accept button without visible text. Keep such hints short and never put essential information only there.
