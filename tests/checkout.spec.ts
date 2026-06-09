import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../data/users";
import { InventoryPage } from "../pages/InventoryPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CartPage } from "../pages/CartPage";
import { checkoutData } from "../data/checkoutData";

test("successful checkout", async ({ page }) => {
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
});
