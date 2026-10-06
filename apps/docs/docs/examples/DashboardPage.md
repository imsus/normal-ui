# Dashboard

A back-office overview: four key figures, a daily target, an attention list, a small bar chart with a table view, and the latest orders.

**Consumer provides:** the figures and their comparison sentence, the target, the chart data, the attention items and the order rows.

- Key figures are a `<dl>`: the label in `dt` (`gray-text`), the value in `dd`, and the comparison written as words ("up 12% on last Monday"), never as a coloured arrow alone.
- Progress towards a target uses a native `<progress>` with a visible `<label>` that states both numbers.
- Attention items carry a bordered text tag ("Late", "Stock"), not a coloured dot. There are no status colours in this system.
- Every chart is a `<figure>` with a `<figcaption>`, `role="img"` and an `aria-label` that states the takeaway, a `<title>` per mark for the browser's own tooltip, and a "Show as table" `<details>`.
- Chart marks use `link`; axes and ticks use `gray-text`; gridlines use `rule` at reduced opacity so they stay recessive.
