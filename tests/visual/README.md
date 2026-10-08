# Visual baselines (P0.4)

Every component page plus five example previews, light and dark, at 375px and
1280px. Later good-css phases must match these screenshots or name their
intended differences in the PR, then update them.

## Run

```bash
pnpm test:visual            # compare against the baselines (builds the docs first)
pnpm test:visual:update     # re-take them after an intended look change
```

Screenshots are viewport-only: small enough to keep in the repo, and every
Normal UI style also renders above the fold. Snapshots live in
`baseline.spec.ts-snapshots/` and are platform-specific (system fonts differ
per OS), so macOS and Linux each keep a set.

## Linux baselines

CI compares against the `-linux` set and fails when a baseline is missing.
The failing run uploads what it rendered as the `visual-baselines-linux`
artifact: download it, move the PNGs into `baseline.spec.ts-snapshots/`,
check a few by eye, and commit them.
