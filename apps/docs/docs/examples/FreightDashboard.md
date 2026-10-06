# Freight dashboard

A freight analytics screen for a fictional carrier, Lintas Cargo, rebuilt to survive any data. Every panel renders from data, and a sample-data switch at the top previews six states: no data, 1 record, 2 records, typical, so many, and broken. All figures are sample data.

**Consumer provides:** the data, the filter logic and the actions. Keep the empty, one-item and broken handling below when you plug in real data.

## Layout: grid, flex and gap only

- Page: a vertical flex stack with `gap`. There are no margins between siblings; `main :is(h1, p, dl, …) { margin: 0 }` removes the element defaults inside the layout.
- Key figures: `repeat(auto-fit, minmax(min(100%, 11rem), 1fr))`. There are as many columns as fit; on a tiny screen one column is the full width, never wider.
- Board: the same auto-fit grid at `min(100%, 20rem)`.
  - The trend and heatmap panels span two tracks only inside `@container board (min-width: 44rem)`, so a span never creates an overflowing implicit column.
  - Lanes spans `1 / -1`.
  - `align-items: start` stops short panels stretching to match tall neighbours.
- Panel: a flex column with `gap`, `container-type: inline-size`, and a header that wraps (`flex-wrap`, title `flex: 1 1 12rem`).
- Bars: a three-column grid (`minmax(6rem, 38%) minmax(0, 1fr) auto`). When the panel is under 22rem, a container query moves the bar under its label.

## Defensive CSS

| Risk | Guard |
| --- | --- |
| Long unbroken words and IDs push layout wide | `min-width: 0` on every grid and flex child; `overflow-wrap: anywhere` on labels, IDs and reasons; `break-word` on panels, so table columns don't shrink letter by letter |
| Grid track wider than a phone | `minmax(min(100%, X), 1fr)` |
| `span 2` on a one-column grid | span only inside a container query |
| Wide tables and charts | only inside `.scroll` boxes (`overflow: auto`, `overscroll-behavior: contain`, `scrollbar-gutter: stable`); the page never scrolls sideways |
| Very long lists | `.scroll.tall` caps height at `--scroll-max` with a sticky header; lists show a first page plus a count |
| Big numbers in small cards | `font-size: clamp(1.125rem, 13cqi, 1.5rem)` from the card's own width, after a plain `1.5rem` fallback |
| Empty containers collapsing | one `.empty` block with `min-block-size: 9rem`, a heading, a sentence and an optional link; `.note:empty { display: none }` |
| Missing custom property | `var(--space-md, 16px)` style fallbacks on layout spacing; `var(--v, 0)` on bar widths |
| Bar widths | `width: calc(var(--v) * 1%)`, `min-width: 2px` for small positives, `max-width: 100%` |
| Truncation hiding meaning | no `text-overflow: ellipsis` anywhere; content wraps |

## Data states

| Panel | No data | 1 | 2 | Typical | So many | Broken |
| --- | --- | --- | --- | --- | --- | --- |
| Key figures | 0 and "—", "No shipments in this period" | values shown | values shown | values with comparison | 15,482,907 wraps and shrinks inside its card | "Not available" plus the reason; card border turns dashed |
| On-time trend | empty state with a link | one dot, "a trend needs at least two" | line plus "a comparison, not a trend"; axis extends to 0% | line, target, keyboard readout | 365 days, thinned ticks, PageUp/PageDown step a week | line breaks at bad points, dashed marks at each gap, readout says "no data" or "invalid value" |
| Commodity bars | empty state | one bar, "nothing to compare" | two bars | sorted bars | top 7 plus one "Other (53 commodities)" row with no bar, so the group does not dwarf the rest | long names wrap, a blank name reads "Unnamed commodity", null shows "No data", negative shows "Invalid", both listed last without bars |
| Exceptions | "No exceptions. Every shipment is on schedule." | one item | two items | 5 of 37 plus "Show all 37" | 5 of 12,480 | fallbacks: "No shipment ID", "Lane not recorded", "Unknown status", "No reason given"; long reasons wrap |
| Heatmap | empty state | one row, "Nothing to shade" if all zero | two rows | shaded table | 34 origins in a scrolling box with a sticky header | missing counts show a hatched "—" read as "No data"; a blank origin reads "Unknown origin" |
| Lanes | "No lanes in this period" in the table body | one row, sort buttons disabled | two rows | sortable, filterable | 500 lanes, 10 per page, "Showing 11–20 of 500", Previous/Next | long lane names wrap within 22rem, missing numbers show "—" and always sort last, impossible percentages get a "Check data" badge |

Rules behind the table:
- Never draw what isn't there. Invalid values are gaps or "No data", never zero.
- Always say why a number is missing.
- Change wording as the amount of data changes: one day is not a trend, and two days are a comparison.
- Group or page long data rather than shrinking it. Keep counts in words ("Showing 5 of 12,480").
- The sample-data switch is a preview tool for this page only; remove it in a product.
