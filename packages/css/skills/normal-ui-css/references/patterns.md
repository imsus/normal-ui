# Normal UI patterns

Composite pieces for hand-written HTML: small `pd-` classes and ARIA roles, no
JavaScript. Load `patterns.css` (part of `@imsus/normal-ui-css`) and write the
markup; the stylesheet does the rest. Details live in the comments of
`src/styles/patterns.css` in the package source.

## Single classes

- `.pd-badge`: short status text in a box (`data-tone="strong"` inverts it).
- `.pd-alert`: banner with `data-kind="info|success|warning|error"`.
- `.pd-eyebrow`: small uppercase label above a group.
- `.pd-error`: a field's error message, under the field.
- `.pd-hint`: hint text for a field.
- `.pd-chevron`: dropdown arrow in hand-written markup (`aria-hidden`, next to the label).
- `.pd-sheet`, `.pd-masthead`: page pieces (sheet on a `page` background, header band).
- `.pd-steps`: stepper list with `aria-current="step"` on the current item.
- `.pd-toast`: toast in the top layer (`popover="manual"`, `role="status"`).
- `.pd-scroller`: scroll container with buttons.
- `.pd-toc`: table of contents list.
- `.pd-menu`: popover menu (`<button popovertarget>` + `<div popover class="pd-menu">`).
- `.pd-drop`: file drop zone (a `label` around an `input type="file"`).
- `.pd-card`, `.pd-card-header`, `.pd-card-body`, `.pd-card-footer`, `.pd-card-actions`, `.pd-card-bleed`: card pieces.
- `.pd-select`: custom-styled native select; `.pd-combo`: combobox input + popup.

## ARIA roles

- Breadcrumb: `<nav aria-label="Breadcrumb"><ol><li>`.
- Tabs: `role=tablist` over `button[role=tab]`, with `role=tabpanel` panels.
- Switch: `<input type="checkbox" role="switch">`.
- Tooltip: `.pd-tip` wraps the trigger and a `[role=tooltip]`.
- Grid and treegrid, tree view, accordion, toolbar, carousel, feed, comments:
  write the APG markup from the role names; cells and rows draw focus inside.
