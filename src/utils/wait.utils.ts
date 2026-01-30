import { Page, Locator } from '@playwright/test';
import { config } from '../config/env.config';

export async function waitForElementToBeVisible(
  locator: Locator,
  timeout = config.timeouts.medium
): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

export async function waitForElementToBeHidden(
  locator: Locator,
  timeout = config.timeouts.medium
): Promise<void> {
  await locator.waitFor({ state: 'hidden', timeout });
}

export async function waitForElementToBeAttached(
  locator: Locator,
  timeout = config.timeouts.medium
): Promise<void> {
  await locator.waitFor({ state: 'attached', timeout });
}

export async function waitForElementToBeDetached(
  locator: Locator,
  timeout = config.timeouts.medium
): Promise<void> {
  await locator.waitFor({ state: 'detached', timeout });
}

export async function waitForUrl(
  page: Page,
  urlPattern: string | RegExp,
  timeout = config.timeouts.long
): Promise<void> {
  await page.waitForURL(urlPattern, { timeout });
}

export async function waitForResponse(
  page: Page,
  urlPattern: string | RegExp,
  timeout = config.timeouts.long
): Promise<void> {
  await page.waitForResponse(urlPattern, { timeout });
}

export async function waitForRequest(
  page: Page,
  urlPattern: string | RegExp,
  timeout = config.timeouts.long
): Promise<void> {
  await page.waitForRequest(urlPattern, { timeout });
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
