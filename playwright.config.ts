import { defineConfig } from '@playwright/test';

// Screenshot baselines for the good-css adoption (plan P0.4): every component
// page plus a few examples, light and dark, at 375px and 1280px. Later phases
// must match these or name their intended differences in the PR.
export default defineConfig({
  testDir: './tests/visual',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  // Snapshots are platform-specific (system fonts differ per OS). Linux
  // baselines come from the CI artifact on first run; see tests/visual/README.md.
  projects: [
    { name: 'light-1280', use: { colorScheme: 'light', viewport: { width: 1280, height: 800 } } },
    { name: 'light-375', use: { colorScheme: 'light', viewport: { width: 375, height: 667 } } },
    { name: 'dark-1280', use: { colorScheme: 'dark', viewport: { width: 1280, height: 800 } } },
    { name: 'dark-375', use: { colorScheme: 'dark', viewport: { width: 375, height: 667 } } },
  ],
  use: {
    baseURL: 'http://localhost:4333',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm build && pnpm --filter docs run preview --port 4333',
    url: 'http://localhost:4333',
    reuseExistingServer: !process.env.CI,
    timeout: 10 * 60 * 1000,
  },
});
