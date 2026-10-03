# Chat

A support inbox: a conversation list, a message log and a reply box.

**Consumer provides:** the conversations, the messages with sender and time, and the send handler.

- The conversation list is a `<nav>` of links; the open one has `aria-current` and uses `highlight` / `highlight-text`. Unread counts are words ("2 new").
- Messages are an `<ol role="log">` so new messages are announced politely. Each has a header with the sender name and a `<time>`.
- Your own messages sit on the right on `button-face`; the other person's sit on the left with a `rule` border. Sender names are always shown, so alignment is never the only cue.
- The composer is a real `<form>` with a labelled `<textarea>` that grows (`field-sizing`) and a Send button. Ctrl + Enter also sends; say so in a hint.
- After sending, keep focus in the textarea and scroll the log to the end.
