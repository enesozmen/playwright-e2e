import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly url = '/login';

  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="text"], input[type="email"]').first();
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = this.getByRole('button', { name: 'Log in' });
    this.errorMessage = page.locator('[class*="sign__error"]');
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]');
    this.forgotPasswordLink = this.getByText('Forgot your password?');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  async checkRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.check();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectErrorMessageVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  async expectEmailValidationError(): Promise<void> {
    const validationMessage = await this.emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toBeTruthy();
  }

  async expectPasswordValidationError(): Promise<void> {
    const validationMessage = await this.passwordInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toBeTruthy();
  }

  async expectInputInvalid(input: 'email' | 'password'): Promise<void> {
    const locator = input === 'email' ? this.emailInput : this.passwordInput;
    const isInvalid = await locator.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBe(true);
  }

  async expectLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/.*home/);
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
