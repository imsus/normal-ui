# Loading

Loading at three levels, each saying what is happening in words first: a button whose action is under way, a component waiting for its content, and a region or page waiting for data.

**Consumer provides:** the words ("Saving…", "Loading orders…"), the busy state, and for a skeleton the rough shape of the content.

Button
- `<Button loading loadingText="Saving…">`: the label becomes the words with a spinner, and clicks are ignored until it finishes.
- It is `aria-disabled`, never `disabled`: a disabled button drops keyboard focus, and screen readers would not hear the new label. It keeps its normal look with a busy cursor, because it is working, not unavailable.
- Say the result afterwards in a status message or a Toast ("Changes saved.").

Component
- `<Skeleton>` draws placeholder shapes on `surface-muted`: `shape="text"` with `lines` (the last line shorter), `block`, or `circle` for an avatar.
- Match the real content's shape, so the layout does not jump when it arrives. Skeletons are hidden from screen readers; the `<Loading>` around them announces the loading.
- The pulse stops for people who ask for less motion.

Region or page
- `<Loading busy label="Loading orders…">` marks the region `aria-busy` and announces the label politely. While busy it shows the `placeholder` you pass (usually a Skeleton), or by default the label with an indeterminate `<progress>`.
- `size="page"` centres the default placeholder in a tall area, for a whole page or a main panel.
- Use one Loading per region that loads on its own. Never block the whole page for data that only one panel needs.

`<Spinner>` is the small ring on its own: 1em, in `currentColor`, decorative. Always put the words beside it.
