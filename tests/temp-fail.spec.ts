import { test, expect } from '../src/fixtures/base.fixture';
import * as allure from 'allure-js-commons';

test.describe('Intentional Failure Test', () => {
  test.beforeEach(async ({ loginPage }) => {
    allure.epic('Demo');
    allure.feature('Screenshot on Failure');
    await loginPage.navigate();
  });

  test('should fail and capture screenshot', async ({ page }) => {
    allure.severity('normal');
    allure.story('Failure Screenshot Demo');

    await expect(page.locator('#non-existent-element')).toBeVisible({ timeout: 3000 });
  });
});
