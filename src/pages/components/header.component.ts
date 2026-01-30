import { Page, Locator, expect } from '@playwright/test';

export class HeaderComponent {
  private page: Page;
  private readonly header: Locator;
  private readonly logo: Locator;
  private readonly navigationMenu: Locator;
  private readonly userMenu: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId('header');
    this.logo = page.getByTestId('header-logo');
    this.navigationMenu = page.getByTestId('navigation-menu');
    this.userMenu = page.locator('.user-bubble__profile-pic');
    this.logoutButton = page.getByText('Log out');
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  async openUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.logoutButton.click();
  }

  async expectHeaderVisible(): Promise<void> {
    await expect(this.header).toBeVisible();
  }

  async expectUserMenuVisible(): Promise<void> {
    await expect(this.userMenu).toBeVisible();
  }
}
