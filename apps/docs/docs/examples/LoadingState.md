# Loading state

How a region looks while it loads, and how a button looks while it saves.

**Consumer provides:** what is loading, in words, and a timeout message.

- Put `aria-busy="true"` on the region that is loading and remove it when done. Say what is loading in a heading ("Loading orders…") and show an indeterminate `<progress>`.
- Grey placeholder bars (`button-face`) may hint at the layout; they are `aria-hidden` and only pulse when reduced motion is not requested.
- A button that is saving changes its label to "Saving…", uses `aria-disabled="true"` (so it keeps focus) and ignores clicks until done. Announce the result in a status region.
- After about 10 seconds, say it is taking longer than usual and offer Try again.
