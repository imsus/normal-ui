# Mobile login

A sign-in screen built to pass WCAG 2.2 Accessible Authentication (3.3.8): nothing to memorise or transcribe, paste allowed, and password managers work.

**Consumer provides:** the sign-in, passkey and magic-link handlers, and the error messages.

- Use `autocomplete="username"` and `autocomplete="current-password"` so password managers and phone keychains fill both fields. Never block paste.
- The Show/Hide button is a toggle (`aria-pressed`) joined to the field, with its label in words.
- Offer at least one way in that needs no password: a passkey, or an emailed link.
- No CAPTCHA puzzles. If you need bot protection, use a check that asks the person for nothing.
- One main action, "Sign in", full width. Forgot password and sign-up are plain links below.
- On failure, say what to do ("Enter your password", "That email and password do not match") above the button and move focus to the field to fix.
- No tab bar before sign-in; the top bar shows only the shop name.
