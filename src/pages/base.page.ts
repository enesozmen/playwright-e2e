import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  abstract readonly url: string;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  protected getByRole(
    role: Parameters<Page['getByRole']>[0],
    options?: Parameters<Page['getByRole']>[1]
  ): Locator {
    return this.page.getByRole(role, options);
  }

  protected getByText(text: string, options?: { exact?: boolean }): Locator {
    return this.page.getByText(text, options);
  }

  protected getByPlaceholder(text: string, options?: { exact?: boolean }): Locator {
    return this.page.getByPlaceholder(text, options);
  }

  protected getByLabel(text: string, options?: { exact?: boolean }): Locator {
    return this.page.getByLabel(text, options);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
}
