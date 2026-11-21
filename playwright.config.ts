import { defineConfig, devices } from '@playwright/test';

// Cross-browser checks against the static export served locally.
// Build first (npm run build), then: npx playwright test
export default defineConfig({
  testDir: 'tests/cross-browser',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 45_000,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://127.0.0.1:4391',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve-out.mjs out',
    url: 'http://127.0.0.1:4391/',
    reuseExistingServer: false,
    timeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'iphone', use: { ...devices['iPhone 15'] } },
    { name: 'android', use: { ...devices['Pixel 7'] } },
  ],
});
