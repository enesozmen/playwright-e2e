import { defineConfig, devices } from '@playwright/test';
import { config } from './src/config/env.config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html', { open: 'never' }],
  ],

  use: {
    baseURL: config.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: config.timeouts.medium,
    navigationTimeout: config.timeouts.long,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        headless: false },
       },
  ],
});
