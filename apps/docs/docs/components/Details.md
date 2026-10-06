# Details

A native `<details>` with a `<summary>`: keyboard toggling and open/closed state announced to screen readers. The browser's marker is replaced by the system's state arrow, pointing right when closed and down when open, so it looks the same in every browser.

**Consumer provides:** the `<summary>` text and the hidden content.

- Write the summary as the question or heading the content answers.
- Use for optional or secondary content only. Anything a reader must see to finish a task stays visible.
- The summary takes the `focus-ring` like any control; the whole summary line is the click target.
- Opening and closing animate the height over 0.2s, only when the reader has not asked for reduced motion. Do not add your own animation on top.
- Give several `<details>` the same `name` to make an accordion where opening one closes the others.
