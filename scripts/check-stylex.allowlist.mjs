// Allow-list for scripts/check-stylex.mjs: today's known violations, one entry
// per occurrence. Each group names the phase that removes it; the script
// fails on stale entries, so phases must delete what they fix. Seeded in
// P0 (2026-10-08) and reviewed against the plan's audit:
// 18 hover keys, 52 physical keys, 1 outline none, 3 overflow hidden.
// Do not add new entries without a reasoned comment.
export default [
  // Permanent: a StyleX style name, not the CSS top property (Menubar bar).
  { file: "packages/react/src/components/Menubar.tsx", rule: "physical", fragment: "top" },
];
