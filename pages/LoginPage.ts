import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

 async login(user: { username: string; password: string }) {
  await this.page.locator('#user-name').fill(user.username);
  await this.page.locator('#password').fill(user.password);
  await this.page.locator('#login-button').click();
}

  async getErrorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}