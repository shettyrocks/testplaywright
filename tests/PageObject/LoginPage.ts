import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userField = this.page.locator('input[name="user-name"]');
    this.passwordField = this.page.locator('input[name="password"]');
    this.submitButton = this.page.locator('input[type="submit"]');
  }

  async login(username: string, password: string) {
    await this.userField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }
}