import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

import { users } from "../data/users";

test("Complete order flow", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.navigate();
  await loginPage.login(users.standard);

  // Add product
  await inventoryPage.addProductToCart(
    "Sauce Labs Backpack"
  );

  // Verify badge
  await expect(
    inventoryPage.cartBadge
  ).toHaveText("1");

  // Open cart
  await inventoryPage.openCart();

  // Verify cart
  expect(
    await cartPage.getCartItemsCount()
  ).toBe(1);

  // Checkout
  await cartPage.proceedToCheckout();

  // Finish order
  await checkoutPage.finishOrder();

  // Verify success
  await expect(
    checkoutPage.successMessage
  ).toContainText("Thank you");
});