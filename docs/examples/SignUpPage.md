# Sign-up

Account creation with as few fields as possible, rules shown before they are broken, and a passkey alternative.

**Consumer provides:** the fields you truly need, the password policy and the handlers.

- Ask only for what the first session needs. Every extra field costs sign-ups.
- `autocomplete="new-password"` lets password managers suggest a strong password. Never block paste; never ask to type the password twice when Show is available.
- List the rules under the field and tick each one as it is met (✓, read as "Met:"), so nobody learns the rules from an error.
- Marketing opt-in is unticked by default and says how to stop.
- Terms are linked in small text, not a required checkbox, unless your law requires one.
