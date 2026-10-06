# Checkout

A form page: an error summary, grouped fieldsets, hints and an inline error, radio and checkbox choices, a primary button with a back link, and an order summary table beside the form that stacks under it on narrow screens.

**Consumer provides:** the fields, their validation and messages, the order data, and layout CSS.

- Put an error summary first when a submit fails: a box with a 2px `canvas-text` border, a heading counting the problems ("There is 1 problem"), and a link to each broken field. Move focus to it.
- Repeat each error above its field in bold, connect it with `aria-describedby`, and set `aria-invalid="true"`. The field gets the doubled border; the words carry the meaning.
- Hints sit between label and field in `gray-text` at 0.83em and are linked with `aria-describedby`.
- Set `autocomplete` on every personal-data field (WCAG 1.3.5), and `inputmode="numeric"` for number codes.
- Size short fields to their expected content, for example `width: 10ch` for a postcode.
- One `<button type="submit">` states the next step ("Continue to payment"). Secondary routes are links.
- Hide optional inputs such as a voucher in `<details>`, not behind a modal.
- Say in the label why a choice is disabled.
