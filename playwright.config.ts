import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e', // Path to your Playwright tests
  use: {
    // Browser settings, e.g., headless mode
    headless: true,
  },
  reporter: [['list'], ['html']], // Optional: Set the reporter
});
