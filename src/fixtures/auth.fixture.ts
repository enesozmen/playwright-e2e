import { test as base } from './base.fixture';
import { config } from '../config/env.config';

type AuthFixtures = {
  authenticatedPage: void;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page, loginPage }, use) => {
    await loginPage.navigate();
    await loginPage.login(
      config.users.standard.email,
      config.users.standard.password
    );
    await page.waitForURL(/.*home/, { timeout: config.timeouts.long });
    await use();
  },
});

export { expect } from '@playwright/test';
