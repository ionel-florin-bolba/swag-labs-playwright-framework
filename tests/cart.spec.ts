import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

import { users } from "../data/users";

test("Remove product from add to cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  await inventoryPage.addProductToCart("Sauce Labs Backpack");

  await inventoryPage.openCart();

  expect(await cartPage.getCartItemsCount()).toBe(1);

  await cartPage.removeProduct("Sauce Labs Backpack");

  expect(await cartPage.getCartItemsCount()).toBe(0);
});
