import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

import { users } from "../data/users";
import { checkoutData } from "../data/checkoutData";

test("Complete order flow", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  await inventoryPage.addProductToCart("Sauce Labs Backpack");

  await inventoryPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.fillCheckoutInformation(checkoutData.validCustomer);

  await checkoutPage.finishOrder();

  await expect(checkoutPage.successMessage).toContainText("Thank you");

  await expect(page).toHaveURL(/checkout-complete/);
});
test("Complete order with multiple products", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  await inventoryPage.addProductToCart("Sauce Labs Backpack");

  await inventoryPage.addProductToCart("Sauce Labs Bike Light");

  await inventoryPage.addProductToCart("Sauce Labs Bolt T-Shirt");

  await expect(inventoryPage.cartBadge).toHaveText("3");

  await inventoryPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.fillCheckoutInformation(checkoutData.validCustomer);

  await checkoutPage.finishOrder();

  await expect(checkoutPage.successMessage).toContainText("Thank you");
});
test("Remove product before checkout", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  await inventoryPage.addProductToCart("Sauce Labs Backpack");

  await inventoryPage.openCart();

  await cartPage.removeProduct("Sauce Labs Backpack");

  await expect(cartPage.cartItems).toHaveCount(0);
});
