import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');

    this.checkoutButton = page.locator(
      '[data-test="checkout"]'
    );

    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeProduct(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({
        has: this.page.getByText(productName),
      })
      .locator('button')
      .click();
  }

  async isProductInCart(productName: string) {
    return await this.page
      .locator('.inventory_item_name')
      .filter({ hasText: productName })
      .isVisible();
  }
}