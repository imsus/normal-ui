# Changesets

Versioning for the two published packages, which release in lockstep (`linked`
in `config.json`). Add a changeset file with every pull request that changes
`packages/`:

```md
---
"@imsus/normal-ui-css": patch
"@imsus/normal-ui-react": patch
---

Fix the thing.
```

Use `major` for breaking changes, `minor` for features, `patch` for fixes.
The release workflow opens a version pull request; merging it publishes to npm
with trusted publishing (no token). The first publish (0.1.0) is bootstrapped
by `scripts/npm-publish.mjs`, which publishes whatever versions npm still lacks.
