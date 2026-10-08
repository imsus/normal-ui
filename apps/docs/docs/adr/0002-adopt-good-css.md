---
status: accepted
---

# Adopt good-css.com as the CSS standard

Every stylesheet and StyleX object in this repo follows [good-css.com](https://good-css.com/) in full, pinned to the copy vendored in `skills/good-css/` (upstream commit `6d16d2f`, 2026-10-07). We adopt every technique, but tune the values so the default still reads as the browser's own stylesheet: OKLCH tokens hold the same colours, the fluid type scale brackets the browser's heading sizes, and press feedback uses the gentlest value the site allows (0.98). Rules that change the look more than that belong in themes. We chose this over adopting only the rules that leave the look alone, because a partial standard leaves reviewers deciding rule by rule, and over adopting the site's own values, because the browser's defaults are what Normal UI is for.

## Considered Options

- **Adopt only rules that leave the look alone, and put the rest in an opt-in theme**: keeps the base pure, but splits the standard in two and leaves the core on older techniques (hex colours, colours repeated per mode, px spacing).
- **Adopt good-css with its own values**: simplest to review against, but fluid headings, larger press scale and redrawn colours would make the default stop looking like the browser.

## Consequences

- We drop the global `prefers-reduced-motion: reduce` override (`0.01ms !important`). Motion is opt-in per rule inside `no-preference`, so the base no longer forces consumers' own motion off.
- Colours are written in `oklch()` with `light-dark()`, and variants come from `color-mix()`. So the contrast gate in `build-tokens.mjs` must convert OKLCH and evaluate `color-mix` to keep the WCAG 2.2 AA guarantee.
- The 44px hit area (good-css 5.4) applies only to small and icon-only controls we own, plus an opt-in `.pd-hit` class. It does not go on every `button`, so consumers keep their `::after`.
- Existing public token names (`--space-*`, `--heading-N`) stay. The fluid `--step-N` values sit behind them as internal tokens.
- Changes ship as minor 0.x bumps with a changeset each. Screenshot baselines catch drift in the look.
- When good-css changes, re-sync `skills/good-css/` deliberately (see `VENDORED.md`) instead of following the live site.

The work is broken into phases in [`../plans/good-css.md`](../plans/good-css.md).
