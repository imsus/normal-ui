# Range slider

The APG multi-thumb slider, built from two native range inputs in a `<fieldset>`: one for the minimum, one for the maximum.

**Consumer provides:** the legend, the bounds, the step and the value format.

- Two labelled native sliders are fully keyboard and screen-reader accessible with no custom roles. Each has its own `aria-valuetext` in rupiah.
- The minimum can never pass the maximum: moving one pushes the other.
- Say the whole range in one sentence under them.
- For precise values, add two number fields that stay in sync.
