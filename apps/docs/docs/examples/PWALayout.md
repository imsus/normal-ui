# PWA layout

A layout for an installed web app. It respects the phone's safe areas and adapts to how it is launched.

**Consumer provides:** a web app manifest, the screens, and a service worker that reports updates.

- Safe areas: the app bar, content and tab bar pad themselves with `env(safe-area-inset-*)`, and the viewport meta has `viewport-fit=cover`.
- `@media (display-mode: standalone)` hides the Install button once installed. The button appears only after the browser fires `beforeinstallprompt`.
- Desktop installs with `"display_override": ["window-controls-overlay"]`: the app bar moves into the title bar area using `env(titlebar-area-*)`, drags the window, and keeps its buttons clickable (`app-region: no-drag`).
- Two `theme-color` metas match the light and dark `canvas`.
- Offline: an inverted `role="status"` line under the app bar, driven by `online`/`offline` events. The preview shows it as an example.
- Update ready: a Toast that says "A new version is ready" with Reload, placed above the tab bar. Never reload without asking; people may be typing.
- Sticky bars set `--pd-sticky-top` and `--pd-sticky-bottom` so focus is never hidden under them.
