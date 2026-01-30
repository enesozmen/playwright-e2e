import { test, expect } from '../../src/fixtures/base.fixture';
import { config } from '../../src/config/env.config';
import * as allure from 'allure-js-commons';

test.describe('Smoke Tests @smoke', () => {
  test.beforeEach(async () => {
    allure.epic('Smoke Tests');
    allure.feature('Critical Path');
  });

  test('should load login page', async ({ page, loginPage }) => {
    allure.severity('blocker');
    allure.story('Application Availability');

    await loginPage.navigate();

    await expect(page).toHaveURL(/.*login/);
  });

  test('should complete login flow', async ({ loginPage }) => {
    allure.severity('blocker');
    allure.story('Critical User Flow');

    await loginPage.navigate();
    await loginPage.login(
      config.users.standard.email,
      config.users.standard.password
    );

    await loginPage.expectLoginSuccess();
  });
});
