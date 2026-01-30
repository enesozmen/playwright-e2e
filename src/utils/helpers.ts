import { Page } from '@playwright/test';

export async function waitForNetworkIdle(page: Page, timeout = 5000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

export async function waitForDomContentLoaded(page: Page, timeout = 5000): Promise<void> {
  await page.waitForLoadState('domcontentloaded', { timeout });
}

export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function generateRandomEmail(): string {
  return `test_${generateRandomString(8)}@example.com`.toLowerCase();
}

export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
}

export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: `./screenshots/${name}.png`, fullPage: true });
}
