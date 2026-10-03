# Link

An `<a href>` in `link` blue, underlined, turning `link-visited` purple once visited and `link-active` red while pressed.

**Consumer provides:** an `href` and link text that names the destination.

- Keep the underline in running text. Colour alone may not identify a link (WCAG 1.4.1).
- Write the destination as the link text: "Read the refund policy", never "click here" or a bare URL.
- Hover thickens the underline to 2px; keyboard focus draws the 2px `focus-ring` outline.
- Use a `<button>` instead when the action does not go to a new URL.
- Opening a new tab? Say so in the text: "Terms (opens in a new tab)".
