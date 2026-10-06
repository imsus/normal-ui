# Meter

A native `<meter>` for a measurement within a known range (storage used, plan usage). Use `<progress>` for task completion instead.

**Consumer provides:** a label, min, max, value, and a sentence saying the value and what it means.

- The bar is always drawn in `link`, whatever the value. Browsers normally turn it green, yellow or red by range; that colour change is removed here because it means nothing to many readers.
- State the meaning in words next to it ("Nearly full: 9.2 GB of 10 GB used") and link it with `aria-describedby`.
- `low`, `high` and `optimum` still tell assistive tech which range the value is in.
