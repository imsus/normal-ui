# normal-ui

The browser's user-agent stylesheet, respecified as Tailwind utilities.

Every component starts from the browser default and re-states it in Tailwind's
nearest palette colors — no bespoke visual language, no JS framework. State
that HTML cannot express ships as attribute-keyed CSS in
[`src/index.css`](src/index.css), so authors get indicators (new-tab ↗,
download ↓, current-page highlight) for free by writing plain attributes.

**Live site:** https://normal-ui.pages.dev

## Components

Grouped Brad Frost-style: atom → molecule → organism → template → page.

| Stage | Components |
| --- | --- |
| Atoms | [Button](https://normal-ui.pages.dev/buttons/) · [Link](https://normal-ui.pages.dev/link/) |
| Molecules | Breadcrumb |
| Organisms / Templates / Pages | — |

## Develop

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # astro check + build to dist/
pnpm preview
```

## Deploy

Direct upload to Cloudflare Pages:

```sh
pnpm build && npx wrangler pages deploy dist --project-name=normal-ui --branch=main
```

## License

[MIT](LICENSE)
