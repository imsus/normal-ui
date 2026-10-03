# Password reset

The two halves of a password reset: asking for the link, and choosing the new password from it.

**Consumer provides:** the send and save handlers, and the link lifetime.

- The confirmation never says whether the email has an account ("if an account uses …"), which protects customers' privacy.
- Say how long the link works and offer to send it again.
- On the new-password screen, repeat which account it is for and include a hidden `autocomplete="username"` field so password managers save the new password against the right account.
- Offer to sign out other devices, ticked by default.
- After saving, sign the person in and show a Toast, rather than sending them back to the sign-in form.
