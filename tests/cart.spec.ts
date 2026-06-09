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
test("Add multiple products to cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  await inventoryPage.addProductToCart("Sauce Labs Backpack");
  await inventoryPage.addProductToCart("Sauce Labs Bike Light");
  await inventoryPage.addProductToCart("Sauce Labs Bolt T-Shirt");

  await expect(inventoryPage.cartBadge).toHaveText("3");
});
test("Continue shopping from cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  await inventoryPage.addProductToCart(
    "Sauce Labs Backpack"
  );

  await inventoryPage.openCart();

  await cartPage.continueShopping();

  await expect(page).toHaveURL(/inventory/);
});