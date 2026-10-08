# Vendored: good-css

A pinned copy of the good-css agent skill, the CSS standard this repo follows
(see `apps/docs/docs/adr/0002-adopt-good-css.md`). Reviews check against this copy,
not the live site. Do not edit the files here; re-sync them instead.

- Site: https://good-css.com/
- Source: https://github.com/vojtaholik/good-css (`skills/good-css/`), MIT, see `LICENSE`
- Pinned at: commit `6d16d2fd27f4892e2aea4b5c5c2b016f45be7eef` (2026-10-07)
- Fetched: 2026-10-08

## Re-sync

Fetch the new version, read the diff, and update the pin above. If a rule changed,
check the plan (`apps/docs/docs/plans/good-css.md`) and the code it already covers.

```bash
base=https://good-css.com/skills/good-css
curl -sSLo skills/good-css/SKILL.md "$base/SKILL.md"
for f in foundations layout spacing-and-shape text-and-media interaction motion show-and-hide scroll-and-viewport; do
  curl -sSLo "skills/good-css/references/$f.md" "$base/references/$f.md"
done
git diff --stat skills/good-css
```
