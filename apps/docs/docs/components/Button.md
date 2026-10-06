# Button

A native `<button>` on `button-face` with a 1px `control-border`, 4px 8px padding and a 24×24px minimum target.

**Consumer provides:** `type` (`button`, `submit` or `reset`; always set it) and a verb-first label.

- One style for every button. Normal UI has no primary or danger variants; order and wording carry the emphasis. Put the main action last in its row.
- Label with the action: "Save address", "Delete 3 files". Never "OK" or "Yes".
- Hover darkens the border to `canvas-text`. Keyboard focus shows the `focus-ring`.
- Disabled buttons get a transparent fill (matching the surface under them), a dashed border and a `gray-text` label (4.6:1 or more on every surface). Prefer leaving the button enabled and explaining what is missing when it is pressed.
- Icon-only buttons need an `aria-label`.
- A button whose label is one character or icon (× close, ‹ › previous and next, B I U formatting, ⋯ more) is `square`: as wide as it is tall, the glyph centred, the same height as every other button (30px), so a row of them lines up and each has the same target. Name it in words (`aria-label="Close"`). For a bigger square set width and height together in `xstyle`: Spinbutton's − and + are 44px. In plain HTML, add `class="pd-square"` and set `--pd-square: 44px` for the bigger size.
- While its action runs, use `loading` with `loadingText` ("Saving…"): the button stays focusable and announces the new label (see Loading).
