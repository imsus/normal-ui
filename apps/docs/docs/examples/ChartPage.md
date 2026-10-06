# Chart

A reports page: one row of filters, a line chart with a keyboard crosshair and a bar chart, each with a table view.

**Consumer provides:** the filter options, the series data and the takeaway for each chart's label.

- Put all filters in one row above the charts, as native `<select>`, radio and button controls.
- One series per chart, drawn in `link`: 2px lines, 4px-rounded bars, a 5px end dot with a direct label. No legend is needed for one series; the caption names it.
- Hover shows a dashed crosshair and a readout line above the chart. The chart is focusable: arrow keys move day by day, Home and End jump to the ends, and the readout is announced (`aria-live`).
- Native `<title>` tooltips on each mark give a second, zero-script way to read values.
- Bar charts label every bar with its value in `canvas-text`, never in the bar colour.
- Never use two y-axes. Two measures means two charts.
- Always add "Show as table" in a `<details>` under the chart.
