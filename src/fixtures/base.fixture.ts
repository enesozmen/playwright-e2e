import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HeaderComponent } from '../pages/components/header.component';

type Pages = {
  loginPage: LoginPage;
  headerComponent: HeaderComponent;
};

export const test = base.extend<Pages>({
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
