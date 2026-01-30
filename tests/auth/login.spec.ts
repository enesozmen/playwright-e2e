import { test, expect } from '../../src/fixtures/base.fixture';
import { test as authTest } from '../../src/fixtures/auth.fixture';
import { config } from '../../src/config/env.config';
import { TestDataFactory } from '../../src/data/test-data';
import { TestUsers } from '../../src/data/users.data';
import * as allure from 'allure-js-commons';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    allure.epic('Authentication');
    allure.feature('Login');
    await loginPage.navigate();
  });

  test('should display login page elements', async ({ loginPage }) => {
    allure.severity('normal');
    allure.story('Login Page Display');

    await loginPage.expectPageLoaded();
  });

  test('should login with valid credentials', async ({ loginPage }) => {
    allure.severity('critical');
    allure.story('Valid Login');

    await loginPage.login(
      config.users.standard.email,
      config.users.standard.password
    );

    await loginPage.expectLoginSuccess();
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    allure.severity('normal');
    allure.story('Invalid Login');

    const invalidUser = TestDataFactory.createUser();

    await loginPage.login(invalidUser.email, invalidUser.password);

    await loginPage.expectErrorMessageVisible();
  });

  test('should show error with empty email', async ({ loginPage }) => {
    allure.severity('normal');
    allure.story('Validation');

    await loginPage.login('', TestUsers.standard.password);

    await loginPage.expectEmailValidationError();
  });

  test('should show error with empty password', async ({ loginPage }) => {
    allure.severity('normal');
    allure.story('Validation');

    await loginPage.login(TestUsers.standard.email, '');

    await loginPage.expectPasswordValidationError();
  });

});

authTest.describe('Authenticated Login Tests', () => {
  authTest('should be logged in with auth fixture', async ({ page, authenticatedPage }) => {
    allure.severity('critical');
    allure.story('Authenticated Session');

    await expect(page).toHaveURL(/.*home/);
  });
});
