# @imsus/normal-ui-react

Normal UI as React components: 42 components over native elements, precompiled,
so you need no StyleX setup. Every value they draw with is a token, so themes
reach them too.

Public and experimental (0.x): props and module layout may change before 1.0.
MIT licensed. Needs React 19.

## Install

```bash
pnpm add @imsus/normal-ui-react
```

Load the styles once per page, in this order (base, theme, components):

```ts
import '@imsus/normal-ui-css';
import '@imsus/normal-ui-css/themes/govuk.css'; // optional theme
import '@imsus/normal-ui-react/styles.css';
```

## Use

```tsx
import { Alert, Button, TextField } from '@imsus/normal-ui-react';

<>
  <Alert kind="warning">3 products are almost out of stock.</Alert>
  <TextField label="Email address" type="email" autoComplete="email" />
  <Button type="submit">Save address</Button>
</>
```

Import from the barrel, or deep for one chunk:

```tsx
import { Button } from '@imsus/normal-ui-react/components/Button';
```

## Props

Components take native props where they wrap one element, plus:

- `className` and `style`: the escape hatch, applied after the component's own
  styles. Unlayered `className` CSS always wins over component styles.
- `xstyle`: a StyleX style, for StyleX users. Style your own setup against the
  tokens from `@imsus/normal-ui-react/tokens.stylex`.

## Client components

Interactive components (state, effects, handlers: Button, Dialog, Tabs, and the
rest) carry `'use client'` in their modules. Static ones (Badge, Alert,
Breadcrumb, Stepper, Switch, Select, TableOfContents, and the rest) render as
server components. Importing an interactive component into a server-component
page is the client boundary; nothing else to do.

## Browser support

Last 2 Chrome, Firefox, and Safari versions.
