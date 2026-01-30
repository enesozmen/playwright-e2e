import { test, expect } from '../../src/fixtures/auth.fixture';
import * as allure from 'allure-js-commons';

test.describe('Logout Tests', () => {
  test.beforeEach(async () => {
    allure.epic('Authentication');
    allure.feature('Logout');
  });

  test('should logout successfully', async ({ page, authenticatedPage, headerComponent }) => {
    allure.severity('critical');
    allure.story('Valid Logout');

    await headerComponent.logout();

    const loginButton = page.locator('a.homepage-main__button-link', { hasText: 'Log In' });
    await expect(loginButton).toBeVisible();
  });
});
