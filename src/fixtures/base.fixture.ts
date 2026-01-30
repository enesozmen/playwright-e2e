import { test as base } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/login.page';
import { HeaderComponent } from '../pages/components/header.component';

type Pages = {
  loginPage: LoginPage;
  headerComponent: HeaderComponent;
};

export const test = base.extend<Pages>({
  page: async ({ page }, use, testInfo) => {
    await use(page);

    // Test başarısız olduysa screenshot'ı Allure'a ekle
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot();
      await allure.attachment('Screenshot on Failure', screenshot, 'image/png');
    }
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  headerComponent: async ({ page }, use) => {
    const headerComponent = new HeaderComponent(page);
    await use(headerComponent);
  },
});

export { expect } from '@playwright/test';
