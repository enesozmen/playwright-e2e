import { test, expect } from '../src/fixtures/base.fixture';
import * as allure from 'allure-js-commons';

test('should fail intentionally', async ({ page }) => {
  allure.epic('Test');
  allure.feature('Failure Test');
  allure.severity('normal');

  await page.goto('https://mixcurb.com/login');

  // Bu element yok, test fail olacak
  await expect(page.locator('#non-existent-element')).toBeVisible({ timeout: 3000 });
});
