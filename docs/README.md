Normal UI is the browser's built-in stylesheet, kept as the look and repaired where it falls short of WCAG 2.2 AA. The system UI font on white, blue underlined links, grey buttons, black text. Nothing is added for decoration. Where a default fails a reader (tiny h6, 13px code, 13px checkboxes, groove borders, faded placeholders, inconsistent focus rings) it is fixed, and only there.

In code, load `src/styles/tokens.css`, then `src/styles/base.css`. The base starts with a reset based on normalize.css and modern-normalize, in its own sub-layer (`normal-ui.reset`), so it fixes browser differences without wiping the defaults the system is built on. Write plain semantic HTML; the stylesheet styles elements, not classes. Every rule sits in the `normal-ui` cascade layer and inside `:where()`, so any CSS you write outside a layer overrides it, whatever its specificity or load order. If your own CSS uses layers, declare the order once: `@layer normal-ui, app;`.

The React components in `src/components` style themselves with StyleX. StyleX emits its atomic rules in layers declared after `normal-ui`, so a component's styles always win over the element defaults beneath it. For hand-written HTML (Astro, Markdown, server templates), `src/styles/patterns.css` provides the same composite components through ARIA roles and small `pd-` classes.

## Principles

- **The element is the component.** Use `<button>`, `<a href>`, `<label>` + `<input>`, `<fieldset>` + `<legend>`, `<details>` + `<summary>`, `<table>` with `<th scope>`. Never rebuild these from `<div>`s; the native element brings keyboard, focus and screen-reader behaviour for free.
- **Change a default only for a reason a reader would notice.** Every change is listed in the table at the end with the WCAG criterion it serves.
- **Two themes, both checked.** `light` matches the browser's normal rendering; `dark` matches what browsers draw under `color-scheme: dark`. With no `data-theme` on `<html>`, the page follows the device's light or dark setting. Set `data-theme="light"` or `data-theme="dark"` to force one. Both themes, and the device-following dark values, are generated into `tokens.css` from `tokens.json`; change values only there.

## Color

Use the system-color tokens by their role, never by their hue.

- Text: `canvas-text` on `canvas`. Secondary or disabled text: `gray-text` on `canvas`.
- Links: `link`, `link-visited`, `link-active`, always underlined. Do not remove the underline in running text; colour alone may not mark a link (1.4.1).
- Controls: `button-text` on `button-face`; `field-text` and `placeholder` on `field`; outline every control in `control-border`.
- `accent` fills checked checkboxes, radios, range thumbs and progress bars through `accent-color`. Do not paint text with it.
- `mark` with `mark-text` for highlights. Keep the text black in both themes.
- `rule` for `<hr>` and table borders.
- Surfaces: `surface-soft`, `surface-muted` and `surface-raised` tint panels and cards (see Card). Every floating layer (dialogs, menus, the customizable select's list) sits on `surface-raised`: white in light, a step lighter than the page in dark, so it reads as on top. Tooltips and toasts stay inverse. Buttons keep `button-face`, fields `field`, selection `highlight`: those colours mean pressable, editable and chosen, so they never become surfaces. Text, links and controls keep their normal tokens on them: every surface holds `gray-text` at 4.5:1 and control borders at 3:1 in both themes, so nothing changes colour when it sits on a tint.

There are no brand or status hues. For an error, write it out ("Enter a date after today") next to the field and link it with `aria-describedby`; do not rely on red.

| Pair | Light | Dark | Needs |
| --- | --- | --- | --- |
| `canvas-text` on `canvas` | 21:1 | 18.7:1 | 4.5:1 |
| `link` on `canvas` | 9.4:1 | 7.8:1 | 4.5:1 |
| `link-visited` on `canvas` | 11:1 | 9.7:1 | 4.5:1 |
| `link-active` on `canvas` | 4.53:1 | 9.5:1 | 4.5:1 |
| `button-text` on `button-face` | 18.3:1 | 6.9:1 | 4.5:1 |
| `field-text` on `field` | 21:1 | 11.2:1 | 4.5:1 |
| `placeholder` on `field` | 5.2:1 | 5:1 | 4.5:1 |
| `gray-text` on `canvas` | 5.2:1 | 8.4:1 | 4.5:1 |
| `mark-text` on `mark` | 19.6:1 | 19.6:1 | 4.5:1 |
| `highlight-text` on `highlight` | 13.9:1 | 8.5:1 | 4.5:1 |
| `gray-text` on `surface-soft` / `surface-muted` / `surface-raised` | 4.87 / 4.62 / 5.17:1 | 7.59 / 6.74 / 5.88:1 | 4.5:1 |
| `control-border` on `canvas` | 4.5:1 | 6.7:1 | 3:1 |
| `control-border` on `button-face` / `field` | 3.95:1 | 4:1 | 3:1 |
| `control-border` on `surface-soft` / `surface-muted` / `surface-raised` | 4.28 / 4.06 / 4.54:1 | 6.06 / 5.38 / 4.69:1 | 3:1 |
| `focus-ring` on `canvas` | 6:1 | 10.8:1 | 3:1 |
| `accent` on `canvas` | 5.3:1 | 10.8:1 | 3:1 (held to 4.5:1) |

`link-active` in light passes by a hair. It only shows while the pointer is held down; never use it for resting text.

## Typography

Three families, all already on the reader's device, no web fonts to load:
- `--font-sans`: the operating system's UI font (`system-ui`, then Segoe UI, Roboto, Helvetica, Arial). Used for everything: text, headings and controls.
- `--font-mono`: the platform monospace (`ui-monospace`, then SF Mono, Consolas, Menlo, Courier New). Used for code.
- `--font-serif` (Times New Roman) stays available if a product wants long-form reading in serif, but nothing uses it by default.

- Body copy in `body`: 16px on a 24px line. That line is the rhythm unit. Keep lines under about 75 characters by constraining the container, for example `max-width: 40rem`.
- Headings come in two scales, chosen by context (see "Reset and rhythm"). Line heights snap to the grid with `round(up, 1.2em, step)`.
- Use headings in order. Never skip a level to get a smaller size; in app UI the scale is already smaller.
- `small` is the smallest text allowed (0.83em, about 13px).
- Controls use `control`: 16px, so they grow with the reader's text size instead of staying at the browser's fixed 13.33px.
- Code uses `code` at 1em.
- Set sizes in `em`/`rem`, never `px`, so browser zoom and text-size settings work (1.4.4).

## Reset and rhythm

The reset follows modern-normalize rule for rule, with these additions:
- `line-height: 1.5` on `html`;
- `hanging-punctuation`;
- normalize's `hr` and `abbr` fixes;
- a reduced-motion override that switches off animation for people who ask for less motion.

It uses the same system UI font stack as modern-normalize.

Rhythm is set by context through custom properties, so contexts nest:

| | Content (default, `.pd-content`) | App UI (`.pd-app`) |
| --- | --- | --- |
| h1–h6 | 2 / 1.5 / 1.17 / 1 / 0.875 / 0.875 rem | 1.5 / 1.125 / 1 / 0.9375 / 0.875 / 0.875 rem |
| Heading line-height | snapped to quarter lines (6px) | snapped to 4px |
| Above a heading | h2 1.5 lines, h3–h6 one line; none when first in its box | none |
| Below a heading | half a line | none |
| After a paragraph, list, table | one line, below only | none |
| Page margin | the browser's 8px | 0 |

- Put `.pd-app` on the `<body>` of application screens and space everything with `gap`: `.pd-stack` (column, `--pd-stack-gap`) and `.pd-cluster` (wrapping row, `--pd-cluster-gap`). A nested stack does not inherit its parent's gap.
- Put `.pd-content` on long-form text inside an app (help, changelog, empty-state text) to get the full rhythm back.
- The last child of any box has no bottom margin, so boxes never end with stray space.
- See HeadingRhythm for both scales side by side, with a toggle that shows the 24px line grid.

## Spacing and layout

- `space-sm` (8px) is the body margin. `space-md` (1em) separates paragraphs, lists, tables and figures. `space-indent` (40px) indents lists and blockquotes.
- `space-lg` (24px) is the minimum height and width of any clickable control (2.5.8). Checkboxes and radios are drawn at 18px with 3px margins to reach it.
- `space-xs` / `space-sm` pad buttons, fields and table cells.
- Images, video and SVG never exceed their container; `<pre>` scrolls on its own. The page reflows to 320px wide without sideways scrolling (1.4.10).

## Controls and states

- **Rest:** `button-face` fill, 1px `control-border`, `radius-control` corners.
- **Hover:** the border darkens to `canvas-text`. Links thicken their underline to 2px.
- **Focus:** a 2px solid `focus-ring` outline, offset `space-2xs`, on every focusable element when reached by keyboard (`:focus-visible`). Never set `outline: none` without a replacement of equal strength.
- **Active:** links turn `link-active`.
- **Disabled:** the fill becomes transparent (so it matches whatever surface it sits on), the border turns dashed, text becomes `gray-text`. The text stays above 4.5:1; the dashed border and `cursor: not-allowed` say it is unavailable. Prefer explaining why an action is unavailable over disabling it.
- **Invalid:** state it in words beside the field and link it with `aria-describedby`. The border doubles in `canvas-text` through `:user-invalid`, so it only appears after someone has typed or tried to submit, never on an untouched form. Set `aria-invalid="true"` for errors your own code finds.
- **Growing text:** textareas grow with their content (`field-sizing: content`) from 3 lines to 12, then scroll.
- **Disclosure:** `<details>` opens and closes with a 0.2s height transition, only when the reader has not asked for reduced motion. Browsers without support simply open instantly.
- **More contrast:** under `prefers-contrast: more`, every control and table border switches to `canvas-text`.
- **Forced colours** (Windows High Contrast): borders, the focus ring, disabled text and `mark` switch to the system colours `CanvasText`, `Highlight`, `GrayText`, `Mark` and `MarkText`, so every control stays outlined.

Borders, not shadows. There is no shadow token. Corners are square except `radius-control` on controls and `radius-round` on radios.

## Composite components

A few patterns need more than one element. They are selected by ARIA role or state where one exists, otherwise by a small `pd-` class, and they live in the same `normal-ui` layer.

| Component | Markup | Notes |
| --- | --- | --- |
| Breadcrumb | `nav[aria-label="Breadcrumb"] > ol` | `›` separators skipped by screen readers; last item `aria-current="page"` |
| Tabs | `[role=tablist] > button[role=tab]`, `[role=tabpanel]` | 3px `canvas-text` underline on the selected tab; arrow-key script in the preview |
| Switch | `input[type=checkbox][role=switch]` | 44×24; knob position and fill change together |
| MenuButton | `button[popovertarget]` + `[popover].pd-menu` | native popover, anchor-positioned, closes on Esc and outside click |
| Tooltip | `.pd-tip` > trigger + `[role=tooltip]` | hover and focus, Esc hides (1.4.13); never the only label |
| Badge | `.pd-badge`, `data-tone="strong"` | a status word in a box |
| Alert | `.pd-alert[data-kind]` | kind in words plus border weight: 1px note, 2px done, 2px dashed warning, 3px error |
| Toast | `[popover=manual].pd-toast[role=status]` | inverse colours, top layer, never steals focus |
| Stepper | `ol.pd-steps`, `li[data-done]`, `[aria-current=step]` | ticks read as "Done:" |
| FileUpload | `label.pd-drop` around `input[type=file]` | whole zone opens the picker; drag-over inverts to `highlight` |

## ARIA pattern coverage

Every pattern in the W3C ARIA Authoring Practices Guide (APG) has an example here. Native HTML comes first; a custom ARIA widget is used only where no element does the job.

| APG pattern | In this system | Built on |
| --- | --- | --- |
| Accordion | Accordion (and Details for simple FAQs) | heading + `button[aria-expanded]`, `role=region` |
| Alert | Alert, Toast | `role=alert` / `role=status` |
| Alert and message dialogs | AlertDialog, ProductsPage delete | `<dialog role="alertdialog">` |
| Breadcrumb | Breadcrumb | `nav[aria-label]` + `aria-current` |
| Button, toggle button | Button, Toolbar | `<button>`, `aria-pressed` |
| Carousel | Carousel | `aria-roledescription` carousel/slide, no auto-rotation |
| Checkbox, tri-state | Checkbox, TriStateCheckbox | native, `indeterminate` |
| Combobox | Combobox | `role=combobox` + listbox, `aria-activedescendant` |
| Dialog (modal) | ProductsPage side sheet, mobile sheet and drawer | `<dialog>` + `showModal()` |
| Disclosure | Details, MenuButton | `<details>`, `popover` |
| Feed | Feed | `role=feed`, `aria-posinset`, `aria-busy` |
| Grid | Grid | `table[role=grid]`, roving `tabindex`, cell editing |
| Landmarks | every page | `header`, `nav`, `main`, `aside`, `footer`, `search` |
| Link | Link | `<a href>` |
| Listbox | Listbox | `role=listbox`, typeahead |
| Menu and menubar | Menubar | `menubar`, `menu`, `menuitemcheckbox`, `menuitemradio` |
| Menu button | MenuButton | `popovertarget` |
| Meter | Meter | `<meter>` |
| Radio group | Radio | native |
| Slider, multi-thumb | Slider, RangeSlider | `<input type=range>`, `aria-valuetext` |
| Spinbutton | Spinbutton | `<input type=number>` + buttons |
| Switch | Switch | `role=switch` on a checkbox |
| Table | Table | `<table>` |
| Tabs | Tabs | `tablist`, `tab`, `tabpanel` |
| Toolbar | Toolbar | `role=toolbar`, `aria-keyshortcuts` |
| Tooltip | Tooltip | `role=tooltip` + `aria-describedby` |
| Tree view | TreeView | `tree`, `treeitem`, `group` |
| Treegrid | Treegrid | `aria-level`, `aria-expanded` on rows |
| Window splitter | WindowSplitter | focusable `role=separator` with values |

From the WAI-ARIA 1.3 draft, ReviewComments shows `suggestion`, `comment` and `mark` roles with `aria-details`, plus `aria-description`. Support for these is still uneven, so each also carries a plain-text fallback. `aria-errormessage` is also new; keep `aria-describedby` as the main link from a field to its error until support is complete.

## Newer HTML and CSS

Recent platform features replace script with markup. Each one here falls back to plain native behaviour where it is missing, so nothing breaks; support below is as of September 2026.

| Feature | Component | Support | Fallback |
| --- | --- | --- | --- |
| `appearance: base-select`, `<selectedcontent>`, `::picker(select)`, `::checkmark`, `::picker-icon` | CustomSelect | Chrome/Edge 135+, Safari 27+ | the native select |
| Invoker commands: `commandfor`, `command` (incl. custom `--name`) | CommandDialog | Chrome/Edge 135+, Firefox 144+, Safari 26.2+ | 6-line script |
| `popover="hint"` + `interestfor` | HintPopover | interest invokers Chrome/Edge 142+ | click toggles via `popovertarget` |
| `::scroll-button()`, `::scroll-marker`, `:target-current` | ScrollCarousel | Chromium, experimental | a scroll-snap list |
| `scroll-target-group` + `:target-current` | TableOfContents | Chromium, experimental | a list of in-page links |
| `hidden="until-found"` + `beforematch` | Accordion | Chromium, Firefox | plain `hidden` |
| `:open` | CustomSelect icon | Baseline 2026 | none needed |
| `dialog closedby`, `field-sizing`, `::details-content`, `:user-invalid`, `<search>`, `<details name>` | already used across the system | widely available | native defaults |

Watching, not used yet: the `:heading` / `:heading()` pseudo-classes (experimental in Firefox and Safari previews), `reading-flow` for grid and flex source order, `text-box` trimming, `if()`, `@function` and CSS mixins. None of them fixes an accessibility gap in this system today.

Keyboard rules shared by every composite widget: one Tab stop per widget (roving `tabindex` or `aria-activedescendant`), arrows inside, Home/End to the ends, Esc to close or cancel, and the focus ring drawn inside the item.

Status is always a word first. The border weights and fills in Alert, Badge and Stepper are a second cue, never the only one.

## Layouts and global regions

Five layout examples: **AppShellSidebar**, **AppShellTopbar**, **PWALayout**, and **MobilePortrait** / **MobileLandscape** (one file, two viewports).

Some things belong to the whole app, not to a page. Keep exactly one of each, as direct children of `<body>`, in this order:

| Order | Region | Markup | Rule |
| --- | --- | --- | --- |
| 1 | Skip link | `<a href="#main">` | first focusable thing on every page |
| 2 | Service notice | `<section aria-label="Service notice">` | present on load, so no `role="alert"`; dismissible; focus moves to `main` after |
| 3 | Offline status | `<p role="status">` | inverted `canvas` on `canvas-text`; driven by `online`/`offline` events |
| 4 | Header, nav, `main#main[tabindex=-1]`, footer | landmarks | one `<main>`; each `<nav>` labelled |
| 5 | Live announcer | empty `<div role="status">` | exists from page load, or screen readers miss the first message |
| 6 | Toast | one `popover="manual"` | top layer; one at a time; 6 seconds unless hovered or focused |
| 7 | Dialogs | `<dialog>`, incl. session timeout `role="alertdialog"` | warn before any timeout and offer more time (2.2.1) |

Popovers and dialogs render in the browser's top layer, so the system has no `z-index` scale; sticky bars use `z-index: 3` only to sit above page content.

Layout rules:
- Sticky bars set `--pd-sticky-top` and `--pd-sticky-bottom`. The stylesheet turns them into `scroll-padding` on the root, so keyboard focus never lands under a bar (2.4.11).
- Never lock orientation (1.3.4). In landscape on phones, bottom tabs become a start-edge rail and safe-area padding moves to the sides.
- Reflow to 320px wide (1.4.10): sidebars become a popover drawer, top-bar links scroll in their own row.
- Installed apps respect `env(safe-area-inset-*)`, `display-mode` and `env(titlebar-area-*)`.

### Complex example

**FreightDashboard** is a freight analytics screen for a fictional carrier, Lintas Cargo. It is built with grid, flex and gap only, plus defensive CSS, and it renders every panel from data. A sample-data switch previews no data, 1, 2, typical, so many (365 days, 500 lanes, 12,480 exceptions) and broken data (nulls, wrong types, out-of-range values, very long strings). Its guidelines list the defensive CSS rules and how each panel behaves in each state.

**ClassifiedsHome** is the stress test: a dense local-classifieds homepage for a fictional site, Pasar Warga. It has a left rail, category columns in CSS multi-column, a link calendar and side lists. It is built only from the system's defaults, rules and one inverse button, and reflows to one column on phones.

## Page patterns

Three full pages show the elements working together; copy their structure, not their text.

- **BlogPost:** a long-form post with every text element in context: byline, lead, figure with caption, pull quote, code sample, table, corrections with `del`/`ins`, footnotes and related posts. The Typography page shows each element on its own.
- **ArticlePage:** skip link, header and nav with `aria-current`, breadcrumb, a 40rem `<main>` of prose, a data table with row headers, an FAQ built from named `<details>`, and a footer.
- **CheckoutPage:** an error summary that links to each broken field, fieldsets with hints and an inline error, `autocomplete` on every personal field, radio and checkbox choices, one submit button beside a back link, and an order table that stacks under the form on narrow screens.

### App screens

Six screens of one sample back office, Toko Rumah Admin, share a header bar with the main nav (`aria-current` on the open screen), a skip link and a polite live region for announcements.

- **DashboardPage:** key figures as a `<dl>`, a native `<progress>` target, text-tagged attention items, a bar chart and the latest orders.
- **ChatPage:** conversation list, an `<ol role="log">` of messages with names and times, and a growing reply box.
- **ChartPage:** one filter row, a line chart with a keyboard crosshair and readout, a labelled bar chart, and "Show as table" under each.
- **DataTablePage:** search and filter, sortable headers with `aria-sort`, row selection with a bulk action, and pagination.
- **CalendarPage:** a month grid built on `<table>`, today marked with `aria-current="date"` and the word Today, plus an agenda list.
- **KanbanPage:** four columns of cards moved with a "Move to" select, so no task needs drag and drop.
- **ProductsPage:** a collapsible sidebar, a side sheet for editing (a `<dialog>` pinned right) and a modal `<dialog>` to confirm a delete.

Overlays are always native `<dialog>` elements opened with `showModal()`: the browser traps focus, makes the page inert and closes on Esc. Give each an `aria-labelledby` heading, a visible way to close, and return focus to the button that opened it. Use a side sheet for editing one thing next to its list; use a centred modal only to confirm what cannot be undone.

Rules shared by every screen:

- Charts draw data in `link`, axes in `gray-text`, gridlines in `rule` at low opacity, and value labels in `canvas-text`. One series per chart, one y-axis, and a table view always.
- There are no status colours. State is a word ("Late", "Overdue", "2 new"), optionally in a bordered tag.
- Selected rows, open conversations and similar "current" items use `highlight` / `highlight-text`.
- Panels are 1px `control-border` boxes; nothing has a shadow.

### States

- **EmptyState:** first use ("No orders yet") and no results ("No orders match …"), each with one action.
- **LoadingState:** `aria-busy` region with the words "Loading orders…", an indeterminate `<progress>`, and a "Saving…" button with `aria-disabled`.
- **ErrorPage:** 404, 500 and offline, each with a plain heading and a next step.
- **SuccessPage:** a success Alert, the reference in large monospace, and what happens next.

### Flows

- **SignUpPage:** few fields, live password rules, passkey alternative.
- **PasswordResetPage:** request, a privacy-safe confirmation, and choosing the new password.
- **WizardPage:** Stepper, "Step 2 of 4", Back and a Continue button that names the next step.
- **SettingsPage:** Tabs, Switch rows that save at once, a logo FileUpload and a dashed danger zone.
- **DetailPage:** Breadcrumb, status Badge, one primary action plus a MenuButton, facts as a `<dl>`, and an activity timeline.
- **SearchPage:** result count announced, filters with counts, sort, and `<mark>` on matches.

### Marketing

**LandingPage**, **PricingPage** and **HelpCenterPage** use the same elements with a top nav and one inverse call-to-action button (`canvas` on `canvas-text`). There are no carousels, autoplay or pop-ups.

### Mobile web

Five phone screens (designed at 390px) share one layout: a sticky top bar, a single content column, and a bottom tab bar on top-level screens.

- **Top bar:** 56px tall, sticky, `canvas` with a `rule` bottom border. It holds the page title as the `h1` and at most one action, or a back link that names its destination ("‹ Products"). Pad it with `env(safe-area-inset-top)`.
- **Content:** one column with `space-md` (16px) side gutters, max 40rem wide. Leave room at the bottom for the tab bar plus `env(safe-area-inset-bottom)`.
- **Tab bar:** fixed to the bottom, four destinations, each an icon plus a visible label, at least 56px tall. The current tab has `aria-current="page"`, bold text and a 3px `link` bar on top, so it is not shown by colour alone. Hide the tab bar on reading, form and sign-in screens.
- **Touch targets:** controls and list rows are at least 48px tall, well over the 24px AA minimum. Fields use 16px text so phones do not zoom on focus.
- **Keyboards:** set `inputmode`, `type`, `autocomplete` and `enterkeyhint` on every field.
- **Sticky actions:** a form's save bar sticks to the bottom inside the form, above the home indicator.
- **Box sizing:** mobile screens set `box-sizing: border-box` so full-width fields include their padding and border.

Overlays on phones: **MobileBottomSheet** (actions sliding up from the bottom) and **MobileDrawer** (navigation sliding in from the start edge), both modal `<dialog>`s with a visible close button.

Screens: **MobileDashboard**, **MobileList** (search, segmented filter, sticky date groups, Load more), **MobileArticle**, **MobileForm** and **MobileLogin** (meets WCAG 2.2 Accessible Authentication: paste allowed, password managers work, and a passkey or emailed link as an alternative).

## Content

Write labels the way the browser would present a form: short, literal, sentence case. Every input has a visible `<label>`; placeholders are examples, never the label. Buttons say what they do ("Save address", not "OK"). Link text names its destination ("Read the refund policy", not "click here").

## Iconography

One: the state arrow, a small solid triangle (`--pd-chevron` in `base.css`, `<Chevron>` in React). It is drawn as a mask filled with `currentColor`, 0.75em square, so it matches the text it sits beside in every font, theme and browser.

- Disclosures (Details, Accordion, TreeView, Treegrid): before the label, pointing right when closed and down when open.
- Dropdowns (MenuButton, Select, CustomSelect): after the label, pointing down, flipped up while open.
- It is decorative (`aria-hidden`); `aria-expanded` or the native element announces the state. It turns in 0.15s, or instantly for people who ask for less motion.

Everything else uses words and native widgets (checkbox ticks, radio dots). If a product needs icons, pair each with visible text, or give an icon-only button an `aria-label`, and draw it in `canvas-text` so it reaches 3:1.

## What changed from the browser defaults

| Element | Browser default | Normal UI | Why |
| --- | --- | --- | --- |
| Page font | Times (serif), or sans on some platforms | system UI font, as modern-normalize | Familiar, legible UI text on every device |
| Box sizing | `content-box` | `border-box` everywhere | Widths include padding and border, so fields fit their containers |
| Body line height | `normal` (about 1.15) | 1.5 | Easier reading; survives 1.4.12 text-spacing overrides |
| Headings | margins symmetric in em; h1 shrinks inside `section` | rem sizes, more space above than below, line-heights on a 24px grid; a smaller scale in app UI | Headings group with their own text; no surprise sizes |
| `h5` / `h6` | 13.28px / 10.72px | 14px / 14px uppercase | 10.72px is hard to read |
| `code`, `pre` | fixed 13px | 1em | Matches body size and scales with it |
| `kbd` | monospace only | a keycap: 1px `control-border` on `surface-muted` | Reads as a key, not as code |
| Button, input text | 13.33px | 16px (1rem) | Scales with text size (1.4.4) |
| Button padding | 1px 6px | 4px 8px, min 24×24 | Target size (2.5.8) |
| Checkbox, radio | 13×13px | 18×18px in a 24px target | Target size (2.5.8) |
| Focus ring | differs per browser, sometimes thin or dotted | 2px solid `focus-ring`, 2px offset | Focus visible (2.4.7) at 3:1 (1.4.11) |
| Placeholder | faded with opacity in some engines | `placeholder`, 5:1 | Contrast (1.4.3) |
| Fieldset border | 2px groove, light grey | 1px solid `control-border` | Non-text contrast (1.4.11) |
| `hr` | 1px inset grey | 1px solid `rule` | Non-text contrast (1.4.11) |
| Table | 2px border-spacing, 1px padding, no borders | collapsed, 1px `rule` borders, 4px 8px padding | Readable cells |
| Dark button face | about #6b6b6b | `button-face` #5a5a5a | White label from 5.3:1 to 6.9:1 |
| Disabled text | faded, often under 3:1 | `gray-text`, 5:1+, dashed border | Readable, and not conveyed by fading alone |
| Images | intrinsic size | `max-width: 100%` | Reflow (1.4.10) |
| Paragraph wrapping | greedy | `text-wrap: pretty` (headings `balance`) | No single word stranded on a last line |
| Textarea | fixed 2 rows | grows 3–12 lines | Less scrolling inside a small box |
| Invalid fields | no style, or styled before anyone types | doubled border after interaction (`:user-invalid`) | Errors appear when they are useful, not as noise |
| Dialog | `border: solid` (about 3px, medium), backdrop 10% black | 1px `control-border`, token colours, backdrop 50% black | Clear edge and a backdrop that shows the page is out of reach |
| Accent (checkbox, switch, progress) | Chromium #0075ff, 4.2:1 on white | `accent` #0066dd, 5.3:1, same hue | Checked states and the switch knob read clearly |
| Forced colours | author colours can vanish | mapped to system colours | Controls stay visible in High Contrast mode |

Kept exactly: the link blues and purples, the active red, the yellow `mark`, content heading sizes `h1`–`h4`, list indents and the 8px body margin on content pages.
