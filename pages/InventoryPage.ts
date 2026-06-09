import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;

  readonly products: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;

    this.products = page.locator(".inventory_item");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

    this.cartLink = page.locator('[data-test="shopping-cart-link"]');

    this.productNames = page.locator(".inventory_item_name");
  }

  async getProductsCount() {
    return await this.products.count();
  }
  async getFirstProductName() {
    return await this.productNames.first().textContent();
  }

  async sortByAZ() {
    await this.sortDropdown.selectOption("az");
  }

  async sortByZA() {
    await this.sortDropdown.selectOption("za");
  }

  async sortByLowToHigh() {
    await this.sortDropdown.selectOption("lohi");
  }

  async sortByHighToLow() {
    await this.sortDropdown.selectOption("hilo");
  }

  async addProductToCart(productName: string) {
    await this.page
      .locator(".inventory_item")
      .filter({
        has: this.page.getByText(productName),
      })
      .locator("button")
      .click();
  }

  async getCartBadgeCount() {
    return await this.cartBadge.textContent();
  }

  async openCart() {
    await this.cartLink.click();
  }
  async removeProductFromCart(productName: string) {
    await this.products
      .filter({
        has: this.page.getByText(productName),
      })
      .locator("button")
      .click();
  }
}
