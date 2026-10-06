---
name: normal-ui-react
description: "Build with Normal UI React components: install the React package, pick a component, pass native props with className/style/xstyle overrides, and handle client components. Use when working in React with precompiled Normal UI components."
---

# Normal UI React

42 React components, precompiled: no StyleX setup on your side. They wrap native
elements, so keyboard, focus, and screen-reader behavior come free.

## Setup

```bash
pnpm add @imsus/normal-ui-react
```

```ts
import '@imsus/normal-ui-css';
import '@imsus/normal-ui-css/themes/govuk.css'; // optional theme
import '@imsus/normal-ui-react/styles.css';
```

Load the styles once per page, in that order.

## Choosing a component

Import from the barrel, or deep for one chunk:

```tsx
import { Alert, Button, TextField } from '@imsus/normal-ui-react';
import { Button } from '@imsus/normal-ui-react/components/Button';
```

Per-component guidance lives in [references](references/): one file per
component, copied from the docs at build time. Read the file for the component
you are using before writing anything clever.

## Props

Components take native props where they wrap one element, plus:

- `className` and `style`: the escape hatch, applied after the component's own
  styles. Unlayered `className` CSS always wins over component styles.
- `xstyle`: a StyleX style, for StyleX users. Needs your own StyleX setup and
  the tokens from `@imsus/normal-ui-react/tokens.stylex`.

## Client components

Interactive components (state, effects, handlers: Button, Dialog, Tabs, and the
rest) carry `'use client'` in their modules; static ones (Badge, Alert,
Breadcrumb, Stepper, Switch, Select, TableOfContents, and the rest) render as
server components. Importing an interactive component into a server-component
page is the client boundary; nothing else to do. In Astro, hydrate islands with
`client:*` as usual.
