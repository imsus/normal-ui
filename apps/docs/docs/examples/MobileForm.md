# Mobile form

A long form at phone width: one column of full-width fields in titled groups, an inline error, and a save bar that stays on screen.

**Consumer provides:** the fields, validation messages and the save and cancel handlers.

- One column. Two fields may share a row only when both are short numbers (stock, weight).
- Every field is at least 48px tall with 16px text, so phones do not zoom in on focus.
- Ask for the right keyboard: `inputmode="numeric"` for money and counts, `type="email"`, `type="tel"`, and `enterkeyhint` to label the return key.
- Units go in a fixed prefix beside the field ("Rp") and in the label for plain numbers ("Weight (g)").
- Errors sit between label and field in bold words, linked with `aria-describedby`; on a failed save, move focus to the first broken field.
- The save bar sticks to the bottom inside the form: Cancel on the left, the main action wider on the right. It clears the phone's home indicator with the safe-area inset.
