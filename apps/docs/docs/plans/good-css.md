# Plan: follow good-css.com

Brings `packages/css`, the three themes, `packages/react` and the docs site in line with [good-css.com](https://good-css.com/), as decided in [ADR 0002](../adr/0002-adopt-good-css.md). The rules come from the vendored copy in `skills/good-css/`. Numbers like **5.2** point to the site's entries; `references/<file>.md` has the CSS and the conditions for each.

Every technique is adopted, with values kept close to the browser's stylesheet: change *how* a value is written, not what it looks like, unless the phase says otherwise.

Each phase is its own PR (or several), with a changeset (minor bump, 0.x) saying what consumers will see. Each workstream below is written to become one issue.

## Audit snapshot (2026-10-08)

Counted across `packages/css/src/styles/{base,patterns}.css`, `packages/css/themes/*/theme.css` and `packages/react/src/components/*`.

| Rule | Now |
| --- | --- |
| 6.1 opt-in motion | Global `0.01ms !important` override in `base.css` (reset layer, `prefers-reduced-motion: reduce`). |
| 5.2 hover gating | 34 `:hover` rules, none inside `(hover: hover) and (pointer: fine)`. |
| 5.1 focus | 6 `outline: none`: `base.css` (`:focus:not(:focus-visible)`), `patterns.css` (treeitem, select option), `govuk/theme.css` (checkbox/radio ring drawn with `box-shadow`), `TreeView.tsx`. |
| 1.2 logical properties | About 71 physical against 219 logical. Hot spots: tabs and menubar `border-bottom`, `.pd-alert` margins, `hr` `border-top`, accordion, feed, card dividers, `Card.tsx` / `Content.tsx` `borderBottom*` and `marginTop`. |
| 1.3 / 1.4 colour | 190 hex values across `tokens.json` and theme tokens. No `oklch`, one `color-mix`, no `light-dark()`. Dark values are written twice (media query and `[data-color-scheme]`). The contrast gate reads hex only. |
| 1.5 / 1.6 fluid scale | All spacing in px, fixed heading sizes, no `clamp()`. |
| 2.x layout | No container queries, `auto-fit`/`auto-fill`, subgrid or safe alignment. |
| 4.4 / 5.4 / 5.3 | No `text-box`, no hit-area expansion (targets are 24px), press feedback is a `translate` offset of 0. |
| 6.2 motion tokens | No easing tokens, and durations (`0.15s`, `0.2s ease`) are written straight into rules. |
| 7.1 | No `@starting-style` enter or exit on dialogs or popovers. |
| 2.8 | `overflow: hidden` in `CommandPalette.tsx` (2) and `shared.ts`. |
| Already followed | Cascade layers + `:where()`, `:focus-visible` ring, `:user-invalid`, `field-sizing` textarea, `::details-content` with `interpolate-size`, motion inside `no-preference`, anchor positioning, `text-wrap` balance/pretty, forced-colors and prefers-contrast, `viewport-fit=cover` (one example missing). |

---

## P0: Guardrails

Done before any CSS changes, so every later phase lands with no new violations and with a picture of the old look.

### P0.1 Vendored skill and records (done)
- `skills/good-css/` (pinned, see `VENDORED.md`), linked from `.claude/skills/good-css`.
- ADR 0002, this plan, and the **Reset** term in `CONTEXT.md`.
- Still to do: point to `skills/good-css` from `packages/css/skills/normal-ui-css/SKILL.md` and the README's "Working here" section.

### P0.2 Stylelint for the CSS files
- Add `stylelint` + `stylelint-use-logical` (or `stylelint-plugin-logical-css`) as root dev dependencies, plus a `pnpm lint:css` script that runs in CI.
- Rules: logical properties only; `declaration-property-value-disallowed-list` for `outline: none|0`, `transition: all`, `ease-in` and `overflow: hidden` (allow it where needed with a disable comment and a reason).
- A custom check (a small plugin or a script) that fails on `:hover` outside `@media (hover: hover) and (pointer: fine)`, and on moving or scaling transitions outside `prefers-reduced-motion: no-preference`.
- Generated files (`src/styles/tokens.css`, `themes.css`) are excluded and checked through the build instead.

### P0.3 CI check for StyleX objects
- A script (`scripts/check-stylex.mjs`) that greps `packages/react/src/**/*.ts{,x}` for `outline: 'none'`, `overflow: 'hidden'`, `transition: 'all`, `ease-in'`, `':hover'` keys without the hover media query, and physical keys (`marginTop`, `paddingLeft`, `borderBottom*`, `top`, `left`…).
- Run it in the same CI job as P0.2. Allow listed exceptions only with a comment naming the reason.

### P0.4 Screenshot baselines
- Playwright against the built docs: every component page plus a few examples, light and dark, at 375px and 1280px.
- Store the baselines in the repo (or as a CI artifact), taken before P1 is merged.
- Every later phase's PR either matches the baselines or says in its description which differences are intended, then updates them.

**Done when**: CI runs both linters with an allow-list for today's known violations (removed phase by phase), and the baselines exist.

---

## P1: Changes that leave the look alone

No visible change at default settings (the baselines must match).

### P1.1 Motion opt-in (6.1)
- Delete the `prefers-reduced-motion: reduce` block from `@layer reset` in `base.css`.
- Check that every remaining transition or animation that moves or scales is inside `no-preference` (CSS and StyleX), and that only opacity and colour fades sit outside it.
- Update `apps/docs/docs/README.md` (the change table) and the CSS skill. Changeset: consumers who relied on the global kill switch must add their own.

### P1.2 Hover only where hover exists (5.2)
- Wrap all 34 `:hover` rules: `base.css` (buttons, links), `patterns.css` (tabs, menu items, options…), the theme CSS, and the StyleX `':hover'` keys (`{ default, '@media (hover: hover) and (pointer: fine)': … }`).
- Check that every pressable has an `:active` state that touch users can see.

### P1.3 Focus (5.1)
- Remove `:where(:focus:not(:focus-visible)) { outline: none; }`, which is redundant with `:focus-visible`.
- Treeitem and select option: keep the ring (or move the highlight to `:focus-visible`) instead of `outline: none`.
- govuk checkbox/radio: `outline-color: transparent` (or `outline: 2px solid transparent`) so forced-colors mode can still draw the ring.
- `TreeView.tsx`: same as above.
- Check whether filled buttons in themes need the outline in the button's background colour (5.1).

### P1.4 Logical properties (1.2)
- Convert every physical property in `base.css`, `patterns.css`, the theme CSS, `Card.tsx` and `Content.tsx` (`border-block-end`, `margin-block-start`, `inset-inline-start`, …). Keep `sub`/`sup` offsets only if they really are physical, and leave a comment saying why.
- Replace 4-value `padding`/`margin` shorthands with the `-block` / `-inline` pairs (for example, the `fieldset` and `.pd-accordion [role="region"]` padding).
- Select arrow: `background-position` has no logical form. Keep the `:dir(rtl)` override until P2.3 replaces it.

### P1.5 `overflow: clip` (2.8, 4.1)
- `CommandPalette.tsx` and `shared.ts`: use `clip` unless a script scrolls the element. The visually-hidden helper can use `clip` too.
- Truncation (`label` in CommandPalette) follows 4.1: set it on the element holding the text, with `overflow: clip`.

### P1.6 Reset items (1.1), one per commit with a baseline check
In `@layer reset`, adding one at a time:
- `min-width: 0` on `*, ::before, ::after` (then remove the per-rule `min-width: 0` in `.pd-stack`/`.pd-cluster` and the components).
- `:root`: `scrollbar-gutter: stable`, `font-synthesis: none`, `-webkit-tap-highlight-color: transparent`, `overflow-wrap: break-word`, `text-wrap: pretty`, and the font-smoothing pair. Check that every theme loads every weight it uses (`font-synthesis: none`). (Outcome: no theme loads webfonts — `type.fonts` is empty everywhere — and only 400/700 are used, which every stack's system faces provide. Nothing to add.)
- `body { min-height: 100svh }`. `img, svg, video { display: block }`: check inline icons in buttons and links, which may need `display: inline-block` in patterns. (Outcome: the React chevron sets its own `inline-block`, mask chevrons already are, and the baselines show every inline icon rendering correctly. No patterns exception needed.)
- `input, textarea, select { font-size: max(16px, 1rem) }`. Today `--control-font-size: 1rem` is fine at the default root size, but not when a theme makes the root smaller.
- `touch-action: manipulation` on `button, a, [role=button]`, and `user-select: none` on `button, [role=button]` only.
- Keep `font-family`, `line-height` and `hanging-punctuation` as they are. They are Normal UI's own.

**Done when**: the baselines match, the P1 rules are removed from the allow-lists, and there is one changeset per workstream.

---

## P2: Colour pipeline

The look should not change. Every colour must render the same sRGB value, within rounding.

### P2.1 OKLCH tokens (1.3)
- Convert `tokens.json` and the `themes/*/tokens.json` colours to `oklch()`. Grays, white and black use `none` as the hue (`oklch(100% 0 none)`).
- Where a token is plainly a variant of another (hover faces, subtle tints, the dialog backdrop `rgb(0 0 0 / .5)`), write it as `color-mix(in oklch, …)` from its base. Don't invent new derivations where values were chosen by hand for contrast.

### P2.2 Contrast gate understands OKLCH
- Add `culori` as a build-only dependency of `packages/css`. Change `luminance()` in `scripts/build-tokens.mjs` to parse any CSS colour, and to evaluate `color-mix(in oklch, a p%, b)` and `var()` aliases before checking a pair.
- Fail the build on a value outside the sRGB gamut, or clamp it with a warning.
- Check that all current pairs report the same ratios as before (±0.01).

### P2.3 One set of tokens with `light-dark()` (1.4)
- `build-tokens.mjs` writes each colour once as `light-dark(<light>, <dark>)` on `:root`, with `color-scheme: light dark`. Remove the duplicated `@media (prefers-color-scheme: dark)` and `[data-color-scheme]` blocks.
- `[data-color-scheme="light|dark"]` only sets `color-scheme`. The same goes for themes in `themes.css`.
- `dist/tokens.json` and the StyleX constants stay unchanged in shape.
- Select arrow: move to `appearance: base-select` + `::picker-icon` masked with `--pd-chevron` in `currentColor`, inside `@supports (appearance: base-select)`. The data-URI arrow stays as the fallback (the one per-mode image, kept until browsers catch up). Remove `--pd-select-arrow*` once the fallback can go. (Outcome: plain selects keep the data-URI arrow — `base-select` sizes the button to the selected option instead of the widest one (207px → 108px measured), which reflows surrounding UI. The `.pd-select` pattern stays the opt-in `base-select` path.)
- Add `<meta name="color-scheme" content="light dark">` to `Base.astro` and the examples.
- Update `apps/docs/docs/README.md` (the colour section, how the schemes are generated) and the CSS skill.

**Done when**: the baselines match in light and dark, the gate passes with the same ratios, and `tokens.css` has one colour block.

---

## P3: Fluid scale (1.5, 1.6)

The first intentional change to the look: headings and large spacing scale with the viewport.

- Inputs as unitless numbers: `--narrow` / `--wide` (for example 20 / 80 rem), body `--size-narrow` = `--size-wide` = 1 (body text stays `1rem`), and the heading ratio from 1.2 (narrow) to 1.25 (wide), tuned so `h1` reaches about `2rem` at the wide end. Check the top step's ratio stays ≤ 2.5 (WCAG 1.4.4).
- `--step-N` is internal. The public `--heading-1…6` point at the steps. `.pd-app` gets its own smaller set of steps (`--app-heading-*`) whose narrow and wide ends bracket today's values.
- Space: every `--space-*` token moves from px to rem. Only `--space-lg` and above become fluid (`clamp()` from the same inputs). `2xs`–`md` stay fixed, because control spacing must not move.
- Keep the rhythm system: `--pd-line` and the `round(up, …)` heading line-height snapping must still hold at every step. Check `HeadingRhythm`.
- The `rootSize` media steps in themes (`build-tokens.mjs` `rootSteps`) become fluid steps too, or stay as they are with a written reason.
- Components use tokens only and never repeat the `clamp()` math (enforced by the P0 lint: no `clamp(` with `vw` outside `tokens.css`).

**Done when**: baselines at 1280px match within the intended heading change, 375px shows the smaller headings, and the docs describe the scale.

---

## P4: Interaction, motion, show/hide

### P4.1 Motion tokens (6.2)
- Add `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`, plus duration tokens (press 160ms, small popover 150ms, dropdown 200ms, dialog 250ms), to `tokens.json`.
- Replace every hard-coded `0.15s` / `0.2s ease` in CSS and StyleX.

### P4.2 Press feedback (5.3)
- Add a `--press-scale: 0.98` token, applied on `:active` to buttons and pressables, with the `transform`/`scale` transition inside `no-preference`. It replaces or combines with `--button-press-offset`, which themes still use.

### P4.3 Hit area (5.4)
- Add a 44px `::after` hit area to small and icon-only controls we own: icon buttons, dialog and toast close buttons, chevron toggles, and labels around checkboxes and radios. Add the `.pd-hit` pattern class for hand-written HTML.
- Never on every `button`. Check for clashes with 5.5 and 6.4 `::after`, and that no `overflow: clip` sits on those buttons.

### P4.4 Enter and exit for dialogs and popovers (7.1, 7.2)
- `dialog`, `[popover]` and `::backdrop`: `opacity` + `display`/`overlay` `allow-discrete`, with `@starting-style`. The slide or scale (from `scale(0.95)`) goes inside `no-preference`.
- Anchored popovers (`Popups.tsx`, `HintPopover`, menus): `position-area: block-end span-inline-end` + `position-try-fallbacks` inside `@supports`. Remove any JS positioning.
- Scroll lock: `html:has(dialog:modal) { overflow: hidden }` (5.6).

### P4.5 Accordion and reveal (7.3, 7.4)
- `::details-content`: keep the current animation, but move the easing to tokens, and check that no padding sits on `::details-content`.
- Overlapping menus and panels: reveal with `clip-path`, not `height`.

### P4.6 Text and media (4.x)
- `text-box: trim-both cap alphabetic` on single-line labels (buttons, badges, chips), on the inner `span` for `inline-flex` buttons, raising padding to keep the height the same.
- Icons: `block-size: 1cap` (inline) or `1lh` (multi-line notices), `flex: none`, never px (Chevron, Alert, Toast icons).
- `tabular-nums` on Meter, Table numeric cells, Spinbutton, timers and `time`, and not globally.
- Avatar and thumbnail boxes in the examples and Card: `aspect-ratio` + `object-fit` + `flex: none` (4.2).
- Card nested radius: `calc(var(--radius) + var(--pad))` (3.4).

### P4.7 Clickable cards, sliding indicator, `:has()` (5.5, 6.6, 5.6)
- Card links: one real link with a stretched `::after`, and the ring moved to the card with `:has(:focus-visible)`.
- Tabs, menubar and TableOfContents: an active indicator drawn with anchor positioning (`anchor-name` on `[aria-current]` / `[aria-selected="true"]`), keeping the bold weight as a second cue.
- Replace any parent-class toggling in components with `:has()` where it applies.

---

## P5: Layout

- **Container queries (2.5)**: `container-type: inline-size` on `header`, `main`, `footer` and the slots in Card and layout components. Components that change shape by width use `@container` and `cqi`, not viewport media queries.
- **Intrinsic grid (2.2)**: `Grid` and the card lists use `repeat(auto-fit, minmax(min(100%, X), 1fr))` (`auto-fill` for filtered lists).
- **Subgrid (2.3)**: cards in a grid line up title, body and footer with `grid-template-rows: subgrid`.
- **Sidebar (2.4)**: the app-shell sidebar layouts use the flex-wrap sidebar instead of breakpoints.
- **Content grid (2.1)**: `.pd-content` / article layouts use named `full-width | breakout | content` lines.
- **Safe alignment (2.7)**: `safe center` on tablists, toolbars and centred dialogs.
- **Spacing (3.1–3.3)**: check `.pd-stack`, `.pd-cluster` and the prose flow against 3.2, push items to the end with auto margins rather than spacer elements, and give sections spacing based on their neighbours in the examples.
- **Stack layers (2.6)**: overlapping layers (badges on avatars, loading overlays) use grid stacking instead of `position: absolute`.

---

## P6: Docs site and examples

- `@view-transition { navigation: auto; }` on the docs (6.5).
- `html { scroll-padding-block-start }` tied to the sticky header height, with smooth scroll inside the motion query (8.4).
- `overscroll-behavior-y: none` on desktop and `auto` on `any-pointer: coarse` (8.5). Inner scrollers use `contain`.
- Safe-area padding (`env(safe-area-inset-*, 0px)`) on the Mobile*, PWA and bottom-sheet examples (8.6). Add `viewport-fit=cover` to the one example missing it.
- Carousel and ScrollCarousel on native scroll snap (8.1). Edge fades on scrollers that overflow, using a scroll timeline (8.3). The scroll area between a fixed header and footer in sheets and drawers (8.2).
- Run the P0 linters over the docs site's own CSS, and over the 37 example HTML files (inline `<style>`).

---

## Out of scope

- GitHub issues: workstreams are written to become issues, but none are opened yet.
- Rules good-css leaves out on purpose (`text-box` on `*`, `optimizeLegibility`, `display: contents` resets).
- Following the live site: changes upstream come in only through a deliberate re-sync of `skills/good-css/`.
