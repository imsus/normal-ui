import { test, expect } from '@playwright/test';
import { readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Routes come from the built docs, so they can never drift from the site:
// component pages are the prerendered <level>/<slug>/ directories.
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'apps', 'docs', 'dist');

function componentRoutes(): string[] {
  const routes: string[] = [];
  for (const level of ['atoms', 'molecules', 'organisms']) {
    for (const slug of readdirSync(join(DIST, level), { withFileTypes: true })) {
      if (slug.isDirectory() && existsSync(join(DIST, level, slug.name, 'index.html'))) {
        routes.push(`/${level}/${slug.name}/`);
      }
    }
  }
  return routes.sort();
}

// A few full pages through their preview URLs (bare example, no docs chrome).
// All static: no clocks, no canvas charts, no random sample data.
const EXAMPLE_ROUTES = [
  '/pages/article/preview/',
  '/pages/checkout/preview/',
  '/pages/dashboard/preview/',
  '/pages/empty-state/preview/',
  '/pages/mobile-dashboard/preview/',
];

for (const route of [...componentRoutes(), ...EXAMPLE_ROUTES]) {
  test(route, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.ok(), `${route} serves 200`).toBe(true);
    if (route === '/molecules/loading/') {
      // The demo fakes two requests that resolve ~2s after hydration; wait
      // for the loaded content so the screenshot is deterministic.
      await page.getByText('12 orders · customer since 2024').waitFor();
      await page.getByText('#1048').waitFor();
    }
    // Viewport-only: small enough to keep in the repo, and every Normal UI
    // style on the page also renders above the fold.
    const name = `${route.replace(/^\//, '').replace(/\/$/, '').replaceAll('/', '-')}.png`;
    await expect(page).toHaveScreenshot(name, {
      animations: 'disabled',
    });
  });
}
