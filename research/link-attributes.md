# Which `<a>` attributes benefit from a UI indicator

Research briefing for the `normal-ui` Link page (`src/pages/link.astro`). The page currently
demos three anchor *states* — unvisited, visited, and href-less placeholder — respecified in
Tailwind palette colors. This document answers two questions: **(Q1)** which anchor *attributes*
deserve a visible UI indicator, and **(Q2)** which `aria-*` link-relevant states benefit from
added UI. It closes with a prioritized recommendation for the page.

**Scope and sourcing.** All claims cite primary sources (WHATWG HTML, W3C WAI-ARIA/APG, MDN).
Two widely-used UI conventions — the external-link/arrow icon and the download icon — are
corroborated by MDN's accessibility guidance; items that are pure convention are flagged as such.

Two framing facts guide everything below:

- **The `a` element gets browser-default styling from its `href` presence and its URL history
  state** — a plain, unvisited link is underlined and blue; a visited link is purple; an element
  with no `href` gets no special styling at all (https://developer.mozilla.org/en-US/docs/Web/CSS/:link).
- **The WHATWG spec itself says `rel`, `hreflang`, and `type` "may be used to indicate to the
  user the likely nature of the target resource before the user follows the link."** That sentence
  is the spec-level warrant for putting attributes *into the UI* at all
  (https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element).

---

## Q1 — Anchor attributes: does a pre-click visual indicator make sense?

### `href` — the attribute everything else hangs off
- **What it does.** Present on an `<a>`, `href` turns the element into a *hyperlink* labeled by
  its contents; absent, the element represents a *placeholder* for where a link might otherwise
  have been placed (https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element).
  It is not required: "when those elements do not have `href` attributes they do not create
  hyperlinks" (https://html.spec.whatwg.org/multipage/links.html#links-created-by-a-and-area-elements).
  All the other attributes (`target`, `download`, `ping`, `rel`, `hreflang`, `type`,
  `referrerpolicy`) "must be omitted if the `href` attribute is not present"
  (https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element).
- **Built-in visual indication: yes — this is *the* core one.** Browsers give an unvisited link
  (blue) and a visited link (purple) distinct colors, plus an underline by default; the
  `:visited` link color survives history-clearing as the standard visual memory signal
  (https://developer.mozilla.org/en-US/docs/Web/CSS/:link). The href-less case is visually
  distinct too: no underline, no color, no pointer cursor — precisely what `normal-ui` already
  demonstrates.
- **Linked CSS.** `a:link` (unvisited), `a:visited` (visited), and `a:any-link` (either, i.e.
  *any* element with an `href`) are the pseudo-classes that select on href presence/history.
  `:any-link` is the correct hook for "this has an href at all"
  (https://developer.mozilla.org/en-US/docs/Web/CSS/:link). No attribute selector is *needed* for
  presence — `:any-link` is it — but `a[href]` is equivalent for "has an href."
- **Verdict.** Already covered by the page's three existing states. This is the *baseline* other
  indicators must not fight (e.g. a `:visited` plus external-arrow both purple would conflict).

### `download` — a strong, near-universal indicator
- **What it does.** "Indicates that the author intends the hyperlink to be used for *downloading
  a resource*"; the value, if any, is the suggested filename (default navigation is used when the
  attribute is absent) (https://html.spec.whatwg.org/multipage/links.html#downloading-hyperlinks).
  It only works for same-origin, `blob:`, and `data:` URLs
  (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download).
- **Built-in visual indication: none pre-click.** The browser does not render an arrow or icon on
  a `download` link before the user clicks; the download behavior happens on activation.
- **Convention.** A **download icon** (down-arrow-into-tray) next to the label is the established
  pattern. MDN's accessibility guidance explicitly treats "links that point to a download file"
  as needing an indicator of what will happen when followed, and shows a file-type icon with `alt`
  text (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#external_links_and_linking_to_non-html_resources).
- **Pure-CSS key.** `a[download]` — the presence of the attribute, not its value. E.g.
  `a[download]::after { content: "⤓"; }` or, better, an inline SVG/unicode with
  `aria-hidden="true"` so the icon stays out of the accessible name
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden).
  A value-driven filename hint is possible but rarely used: `a[download]` alone is sufficient.

### `target` (especially `_blank`) — a strong, strongly-recommended indicator
- **What it does.** Gives the navigable (tab/window/iframe) name that will be used when the
  hyperlink is followed; `_blank` opens a new top-level context, `_self`/`_parent`/`_top` target
  existing contexts (https://html.spec.whatwg.org/multipage/links.html#links-created-by-a-and-area-elements,
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target).
- **Built-in visual indication: none.** Nothing about a `target=_blank` link is visually distinct
  until it opens.
- **Convention.** A **"opens in new tab/window" arrow icon** (a box with an arrow pointing out of
  the corner) is the standard. MDN is explicit: "Links that open in a new tab/window via
  `target="_blank"` ... should indicate what will happen when the link is followed," noting that
  screen-reader users and users with low vision or cognitive concerns can be confused when a new
  tab/app opens unexpectedly (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#external_links_and_linking_to_non-html_resources).
  This is also a WCAG 3.2 predictability concern (MDN cites G200/G201 on the same page).
- **Pure-CSS key.** `a[target="_blank"]`. Note: `_blank` **implicitly implies `noopener`**, so a
  `target="_blank"` link and a `rel="noopener"` link overlap; key off `target` for the icon, not
  `rel` (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target,
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener).

### `rel` — conventions per keyword; only `external` has a UI icon
- **What it does.** An unordered, space-separated set of tokens describing the relationship
  between the linked resource and the current document (no default value)
  (https://html.spec.whatwg.org/multipage/links.html#links-created-by-a-and-area-elements).
  MDN defines the tokens for `a` (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel).
  Only `noreferrer`, `noopener`, and `opener` are *processing-model* tokens the UA must act on;
  the others are pure annotations (https://html.spec.whatwg.org/multipage/links.html#links-created-by-a-and-area-elements).
- Per-keyword indicator analysis:
  - **`external`** — **the one with a real UI convention.** "Indicates the referenced document is
    not part of the current site. This **can be used with attribute selectors to style external
    links** in a way that indicates to the user that they will be leaving the current site"
    (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel). The
    external-link/up-and-out arrow is the canonical icon (Wikipedia/MediaWiki and many others use
    an [⧉ / ↗] glyph). Best keyed **in authoring** by adding `rel="external"` (or a token) and
    matching `a[rel~="external"]` — the space-separated ("~=") operator handles multi-token rels.
    Caveat: helpers that *infer* "external" by comparing the `href` origin to the page origin are
    not pure-CSS; a pure-CSS approximation keying off `href^="http"` is coarse and would also hit
    same-site absolute URLs, so `rel~="external"` is the clean, explicit hook.
  - **`nofollow`** — "the current document's original author or publisher does not endorse the
    referenced document" (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel).
    A crawler directive; intended for machines, **not** users. No visual indicator is sensible —
    showing it would leak internal SEO intent to readers. Pure-CSS hook exists
    (`a[rel~="nofollow"]`) but there is no UX reason to use it.
  - **`noopener`** — navigates without granting `window.opener`; effectively redundant with
    `_blank` today (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener).
    Key off `target="_blank"` for any icon, not `rel="noopener"`. No independent indicator.
  - **`tag`** — "gives a tag ... that applies to the current document"
    (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel). Semantic
    annotation for a single tag link; no established icon. Indicator value: low.
  - **`me`** — "indicates that the current document represents the person who owns the linked
    content" (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel).
    Microformats/person-identity annotation (the basis of *rel-me* verification); no visual
    convention. Indicator value: none practical.
- **Verdict.** Of the five rel tokens asked about, only `external` earns a UI indicator, and it
  is best served by an **explicit** `rel~="external"` hook rather than a brittle origin heuristic.

### `hreflang` — no indicator
- **What it does.** "Hints at the human language of the linked URL. **No built-in functionality**"
  (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#hreflang); per WHATWG,
  with `rel`/`type`, it may indicate to the user the likely nature of the target
  (https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element).
- **Built-in visual indication: none.** **Convention: none** in common practice (browser
  auto-translation is not a per-link UI marker). A CSS `a[hreflang]` hook exists and *could* show
  a language tag for a cross-lingual link, but this is rare and noisy — no established convention.
  **Verdict: no sensible default indicator.**

### `type` — a low/medium conditional indicator (PDF-style links)
- **What it does.** "Hints at the linked URL's format with a MIME type. **No built-in
  functionality**" (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#type);
  with `rel`/`hreflang`, may indicate the nature of the target resource
  (https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element).
- **Convention.** File-type badges (PDF/applications, spreadsheets, archives) are common for links
  to non-HTML downloads. MDN shows exactly this: a link to `2017-annual-report.ppt` with a
  PowerPoint icon whose `alt` says "(PowerPoint file)"
  (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#external_links_and_linking_to_non-html_resources).
- **Pure-CSS key.** Two options: the *declared* type `a[type="application/pdf"]`, or the more
  common *inferred-from-URL* heuristic `a[href$=".pdf"]` (attribute **suffix**). The latter is the
  widely deployed approach for PDF/archive badges and is pure-CSS; it is a heuristic and should be
  flagged as such (it keys off the URL, not the MIME). `normal-ui` could demo
  `a[href$=".pdf"]::after { content: "(PDF)" }` as the canonical version.

### `ping` — no indicator
- **What it does.** "Gives the URLs of the resources that are interested in being notified if the
  user follows the hyperlink" — used by the UA for *hyperlink auditing*
  (https://html.spec.whatwg.org/multipage/links.html#links-created-by-a-and-area-elements;
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#ping). A tracking
  mechanism, invisible and not user-facing.
- **Built-in visual indication: none, and none should exist.** Showing a tracking-beacon glyph
  would be noise and arguably a privacy disclosure concern more appropriate for tooling than UI.
  Pure-CSS hook exists (`a[ping]`) but there is no convention and no good reason to surface it.
  **Verdict: no indicator.**

### `referrerpolicy` — no indicator
- **What it does.** Sets the referrer policy used when following the hyperlink; the eight values
  (`no-referrer` … `unsafe-url`) control how much of the URL is sent in the `Referer` header
  (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#referrerpolicy;
  https://html.spec.whatwg.org/multipage/links.html#links-created-by-a-and-area-elements).
- **Built-in visual indication: none.** It is a network/privacy behavior; there is no UX reason
  for a sighted, pre-click indicator, and no convention exists. Pure-CSS hooks
  (`a[referrerpolicy="no-referrer"]`) are possible but pointless in UI.
  **Verdict: no indicator.**

**Q1 summary — indicators worth building:**
| Attribute | Pre-click built-in | Convention | Pure-CSS hook | Verdict |
|---|---|---|---|---|
| `href` (presence / `:link` / `:visited` / `:any-link`) | **Yes** (color+underline) | n/a (default) | `:any-link`, `[href]` | Baseline; already on the page |
| `download` | No | download icon | `a[download]` | **High — build** |
| `target="_blank"` | No | new-tab arrow | `a[target="_blank"]` | **High — build** |
| `rel~="external"` | No | external arrow | `a[rel~="external"]` | **High — build** (explicit hook) |
| `rel` `nofollow`/`noopener`/`tag`/`me` | No | — | `a[rel~="…"]` | No indicator |
| `hreflang` | No | — (no convention) | `a[hreflang]` | No indicator |
| `type` (and `href$=".pdf"`) | No | file-type badge | `[type="…"]`, `[href$=".pdf"]` | **Medium** — conditional |
| `ping` | No | — | `a[ping]` | No indicator |
| `referrerpolicy` | No | — | `a[referrerpolicy]` | No indicator |

---

## Q2 — Which `aria-*` link states benefit from added UI?

**The ARIA first rule up front.** WAI-ARIA is "intended to be used as a supplement for native
language semantics, not a replacement. When the host language provides a feature that provides
equivalent accessibility to the WAI-ARIA feature, **use the host language feature**"
(https://w3c.github.io/aria/#introduction). For links specifically, native HTML `<a href>` gives
the correct role, name, keyboard behavior (Enter activates), focus, and history styling for free.
ARIA should only be added where native HTML lacks the needed state — and where it is added, **the
visual and behavioral contract must be supplied by the author, because ARIA by itself changes
nothing visible and blocks nothing.** No `aria-*` in this list is a styling hook; several style
themselves via attribute selectors, which is the only CSS-CSS coupling.

### `aria-disabled` — behavioral trap on anchors (most important to document)
- **What it announces.** `aria-disabled="true"` "indicates that the element is perceivable but
  disabled, so it is not editable or otherwise operable," and conveys the disabled state to
  assistive tech (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled).
- **Native default?** **Anchors have NO native `disabled` attribute** — HTML's `disabled` exists
  on form controls (`<button>`, `<input>`, …), not on `<a>`. And unlike that native `disabled`
  (which suppresses functionality, changes styling, and excludes value from submission),
  `aria-disabled="true"` **"only semantically exposes these elements as being disabled. Web
  developers must manually ensure such elements have their functionality suppressed."**
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled).
- **The trap.** `aria-disabled="true"` on a link *announces* disabled but **does not block
  activation**: the link remains focusable, Enter still activates it, and it is not dimmed by any
  user-agent style. So a screen-reader user is told "disabled" and a sighted user sees nothing,
  yet any pointer/keyboard user can still click through. Wire it and you get either a broken
  promise (announced-disabled-but-active) or an actually-still-navigable "disabled" link.
- **What correct disabling looks like** (all author-supplied): actually prevent navigation in
  JS (`event.preventDefault()` and/or remove/`null` the `href`), restyle so sighted users see it
  (`[aria-disabled="true"] { opacity: .5; }` is MDN's own example), keep contrast/forced-colors
  legible, and *optionally* leave it in tab order for discoverability — `aria-disabled` does not
  change focusability, unlike native `disabled` which removes from tab order
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled).
- **UI indicator.** A disabled-looking link (reduced opacity/color, `not-allowed` cursor) *is*
  the conventional indicator, but the honest recommendation is **native-first**: to truly disable,
  drop the `href` (the "no href" placeholder state `normal-ui` already demos) rather than paint a
  fake `aria-disabled` on a still-navigable link.

### `aria-current` — the one genuine "add UI" winner
- **What it announces.** A non-null `aria-current` "indicates that this element represents the
  current item within a container or set of related elements." Valid tokens: `page`, `step`,
  `location`, `date`, `time`, `true`, and `false` (false/absent = not announced). Any non-listed
  non-null string is treated as `true`
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current).
- **Native default?** None — there is no HTML attribute that marks a link as "you are here."
- **Convention.** **Current-page / breadcrumb highlighting.** APG's Breadcrumb pattern requires
  "The link to the current page has `aria-current` set to `page`" on the current page's link
  (https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/). MDN: in a breadcrumb or pagination link
  set, the current page is styled differently *and* gets `aria-current="page"`
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current).
  The visual side — bolding, darker color, no-link appearance, often `aria-current="true"` with a
  distinct background/highlight — is the established "current nav item" pattern.
- **Pure-CSS key.** This is the **best case**: ARIA state → CSS with an **attribute selector that
  matches any truthy token**: `a[aria-current]` (matches `="page"`, `="step"`, `="true"`) — a
  presence selector intentionally decoupled from the specific token. For a token-specific style,
  `a[aria-current="page"]`. So `aria-current` both announces *and* drives the highlight with one
  attribute. **Verdict: High — the archetypal "add UI" case** (this is exactly what
  `:local-link`/nav-current pattern wants to visualize).

### `aria-expanded` — disclosure indicator (chevron convention)
- **What it announces.** Set on the control that toggles another element, `aria-expanded` tells
  AT whether the controlled grouping is expanded (`true`) or collapsed (`false`); pairs with
  `aria-controls` (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded).
- **Native default?** None visually; a `<button aria-expanded>` shows nothing by default.
- **Convention.** **Chevron/arrow rotation.** APG's Disclosure pattern: "When the controlled
  content is hidden, the button is often styled ... with a **right-pointing arrow or triangle**...
  When the content is visible, the arrow or triangle **typically points down**"
  (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/). This applies to disclosure buttons and,
  for link-bearing disclosure *navigation* menus, to the toggle control.
- **Pure-CSS key.** The classic state → CSS hook: `[aria-expanded="false"]` vs
  `[aria-expanded="true"]` toggling a `transform: rotate(90deg)` (or a caret swap). But mind which
  element may carry it. **APG's Disclosure pattern mandates a `<button>`**: "the element that
  shows and hides the content has role button," with an Enter *and* Space activation contract
  links do not honor (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/). Role `link`
  technically appears in MDN's used-in-roles list for `aria-expanded`
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded),
  yet APG's own navigation-with-top-level-links example gives every `<a>` a *separate* toggle
  `<button>` that carries `aria-expanded`; the links themselves only ever receive
  `aria-current="page"`
  (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/).
  MDN's warning lands here: "the presence of the `aria-expanded` attribute indicates control."
  Putting disclosure state on a link teaches authors to bolt toggle behavior onto `<a href="#">`
  — links navigate, buttons toggle. **Verdict: established convention, wrong element for this
  page. It is Button-component state; treat `aria-expanded` on a link as a flag-worthy
  anti-pattern, not a Link feature, and park the chevron demo for a future Button page.**

### `aria-invalid` — form-state indicator, rarely a link concern
- **What it announces.** Indicates a value "does not conform to the format expected by the
  application"; values `true`/`false`/`grammar`/`spelling` (any non-listed value = `true`)
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid).
- **Native default?** For form controls there is native `:invalid`/`:required`-driven styling and
  native validation; MDN notes you pair `aria-invalid="true"` with styling via the
  `[aria-invalid="true"]` attribute selector *and* messaging via `aria-errormessage`
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid).
  For **links** specifically there is no conventional invalid state — a link is not an input.
  **Verdict: no indicator for links**; it is valid only in an input context that the Link page
  does not model.

### `aria-haspopup` — popup-availability indicator
- **What it announces.** "Indicates the availability and type of interactive popup element" the
  control triggers; enumerated values `menu`/`listbox`/`tree`/`grid`/`dialog`/`true`/`false`
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-haspopup).
  Role `link` is in its supported-roles list.
- **Native default?** None. **Convention.** An appended dropdown care/`…` glyph on controls that
  open a menu is common but inconsistent; the popup-arrow affordance is more button/tree-oriented.
  MDN is careful that `aria-haspopup` "provides no interactivity" — it is declarative only.
  **Verdict: Low** — a plausible `a[aria-haspopup="menu"]` style exists but the convention is
  weak and rarely used on bare links.

### `aria-busy` — loading indicator
- **What it announces.** For widgets/regions whose content is being updated asynchronously,
  `aria-busy="true"` tells AT an update is in progress (so it delays publication) — a transient
  state, not a link-state affordance
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy).
- **Native default?** None; conventional visual is a spinner/progress, which is *not* driven by
  `aria-busy` semantics. A link that is mid-loading is unusual. **Verdict: no indicator** for a
  plain link page; `aria-busy` belongs on container/widget roles during async updates.

### `aria-hidden` — why it is NOT a styling hook
- **What it does.** `aria-hidden="true"` removes the element and its descendants **from the
  accessibility tree** (for AT); `false`/absent leaves exposure to the UA. Critically: **"The
  presence of the `aria-hidden` attribute hides content from assistive technology but doesn't
  visually hide anything."**
  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden).
- **Why it is not a styling hook.** Its *only* effect is on the accessibility tree; it has zero
  visual effect, and it is *dangerous* on focusable elements — MDN's warning: **"Do not use
  `aria-hidden="true"` on focusable elements"** — because a focusable-but-hidden-from-AT link
  becomes an invisible, unreachable focus target. Visual hiding belongs to CSS (`display:none`,
  `visibility:hidden`, `hidden`, opacity, clip). It is, however, the **correct companion** for
  decorative indicators (e.g. `aria-hidden="true"` on a decorative download/external icon so the
  glyph doesn't pollute the accessible name — MDN's Tweet-icon example), so it belongs *inside* an
  icon pattern, never as the icon mechanism itself.
- **Verdict: never a UI-indicator mechanism; always the mask for purely-decorative indicator
  glyphs.**

### `aria-describedby` — why it needs NO indicator
- **What it does.** A global attribute referencing the `id`(s) of elements that *describe* the
  current element; AT reads that text as supplementary information. It establishes a description
  *relationship*, not a visual one — the referenced text may even be hidden and still reachable by
  AT (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby).
- **Why no indicator.** `aria-describedby` carries descriptive *content* (e.g. "contains full text
  of the article"), which AT reads on demand; there is no state to visualize and no convention for
  one. Its job is explicitly complementary to `aria-labelledby` (concise label) vs description
  (verbose detail) — both are invisible relationships. Giving `aria-describedby` a UI badge would
  be redundant with the visible text it references. **Verdict: no indicator.**

**Q2 summary — which `aria-*` deserve added UI:**
| Attribute | Announces to AT | Native visual? | Convention | CSS hook | Verdict |
|---|---|---|---|---|---|
| `aria-disabled` | perceivable-but-disabled | No (anchors lack native `disabled`; trap: doesn't block activation) | dim/`not-allowed`; better: drop `href` | `[aria-disabled="true"]` | High-doc, but **native-first** |
| `aria-current` | current item in a set (`page`/`step`/`location`/`date`/`time`/`true`) | None | current-nav highlight / breadcrumb bolding | `[aria-current]` *(truthy)*, `[aria-current="page"]` | **High — the archetypal add-UI winner** |
| `aria-expanded` | controlled content expanded/collapsed | None | disclosure chevron rotates right→down | `[aria-expanded="true"]` | Not a Link feature — Button-page state |
| `aria-invalid` | value failed validation | Native form validation exists | red/error styling (form controls) | `[aria-invalid="true"]` | Not a link concern |
| `aria-haspopup` | a popup (menu/etc.) is available | None | caret/… on menu triggers | `[aria-haspopup="menu"]` | Low |
| `aria-busy` | update in progress | None | spinner (not AT-driven) | `[aria-busy="true"]` | Not a link concern |
| `aria-hidden` | removes from AT tree, **no visual** | N/A | only as decorative-glyph mask | — | Not a styling hook |
| `aria-describedby` | links to descriptive text | N/A | none | — | No indicator |

**Native-first takeaway.** Because HTML `<a>` already supplies link semantics, the single
*highest-value* ARIA addition for a link page is the one state HTML cannot express on a link:
`aria-current` (location in a set). `aria-expanded` looks like a sibling case but is not — its
APG home is the disclosure `<button>`, so a Link API that carries it quietly grows a
button-shaped hole. Everything else either belongs to form widgets (`aria-invalid`, `aria-busy`)
or — like `aria-disabled` on an anchor — is an anti-pattern unless the author separately does the
real disabling.

---

## Recommendations for `normal-ui`

Ranking criteria: **(1)** pure-CSS feasibility via attribute selectors, **(2)** alignment with the
project's "stay close to browser defaults, plain Tailwind" philosophy, **(3)** genuine UX value
for the demo site's audience.

### High — add as demo rows on the Link page

1. **`target="_blank"` with a new-tab arrow.** `a[target="_blank"]::after`. No browser default, a
   strong accessibility rationale (MDN explicitly recommends it), and a one-line attribute
   selector. Aligns with a default-styled indicator (an out-arrow glyph) — but note the project
   philosophy: the indicator is *drawn by you*, so keep it muted/discreet rather than Tailwind's
   loud color. *Source:* https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target
   and #external_links_and_linking_to_non-html_resources.

2. **`download` with a download icon.** `a[download]::after`. Same profile: no default, MDN-backed
   convention, trivial pure-CSS hook. Pair the glyph with `aria-hidden="true"` and an `alt`-equivalent
   via the accessible name so AT users get "download" too. *Source:*
   https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download.

3. **`aria-current` current-page highlight.** `a[aria-current]` (matching any truthy token) → a
   distinct current-nav treatment (e.g., bolder + non-link color), plus `a[aria-current="page"]`
   for the specific "you are here" case. This is the highest-value *ARIA* demo: it is the one ARIA
   state whose attribute-selector CSS hook is both idiomatic and genuinely wanted, and it pairs
   with the page's existing visited-state row. *Source:*
   https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/ and
   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current.

### Medium — consider

4. **`rel="external"` / external-link arrow.** `a[rel~="external"]::after`. A real, documented
   MDN/MediaWiki convention, but (a) it is a *styling-by-annotation* pattern that requires authors
   to add `rel="external"` (nothing infers it in pure CSS), and (b) an automatic origin comparison
   is impossible in pure CSS without the coarse `[href^="http"]` heuristic, which misfires on
   same-site absolute URLs. Valuable to *demonstrate the `~=` operator and the annotation-first
   approach*, but it is more demanding of authors than `target`/`download`. *Source:*
   https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel.

5.  5. **PDF-style `type`/`[href$=".pdf"]` badge.** `a[href$=".pdf"]::after { content: "(PDF)"; }`.
   Demonstrates attribute **suffix** selectors and the non-HTML-resource convention MDN shows;
   weaker because the suffix is a URL heuristic rather than the declared MIME `type`, and the
   "staying near browser defaults" philosophy pushes back on decorative badges. *Source:*
   https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#type and
   #external_links_and_linking_to_non-html_resources.

### Redirected — state that should not live on a link (future Button page)

- **`aria-expanded` disclosure chevron.** The rotation convention (`[aria-expanded="true"]`
  rotates a caret right→down) is clean pure-CSS, but the APG Disclosure pattern defines the
  control as a `<button>` (role button; Enter+Space activation), and even APG's
  navigation-menu-with-top-level-links example keeps `aria-expanded` on a separate toggle button
  beside each link — never on the `<a>` itself
  (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/). Demoing it on the Link page would
  invite `<a href="#">` disclosure toggles and grow the component API a button-shaped hole. Keep
  it for the Button component/page.

### Low / explicitly not recommended

7. **`aria-disabled` on an anchor as-is** — the single most important thing *not* to demo naively.
   Anchors have no native `disabled`, and `aria-disabled="true"` does not block activation, so a
   bare demo row would mislead. If shown at all, frame it as the native-first lesson: the honest
   "disabled link" is the **href-less placeholder the page already renders** (drop the `href`),
   not an `aria-disabled` paint-over. *Source:*
   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled.
8. **`aria-hidden` as a styling hook** — it has no visual effect and is actively harmful on
   focusable links; use it only *inside* the icon patterns above to mask decorative glyphs.
   *Source:* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden.
9. **`hreflang`, `ping`, `referrerpolicy`, `aria-invalid`, `aria-busy`, `aria-describedby`** — no
   sensible pre-click indicator, no convention, and (for the ARIA ones) they belong to form
   controls or describe relationships, not link UI. Leave them out.

**Bottom line for the page.** Keep the three existing states as the browser-default baseline, and
add exactly three high-value, pure-CSS rows: **new-tab arrow (`target="_blank"`), download icon
(`download`), and a current-page highlight driven by `aria-current`** — the last doubling as the
page's showcase that an ARIA attribute can *both* announce state and drive CSS, which is the clean
native-first story `normal-ui` wants to tell. Optionally follow with a `rel~="external"` arrow.
`aria-expanded` is deliberately absent from this page: its APG home is the disclosure
`<button>`, so it is Button-page state — adding it to the Link page or its component API would
grow the Link a button-shaped hole.
