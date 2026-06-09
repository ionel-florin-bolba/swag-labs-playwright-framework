import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../data/users";
import { InventoryPage } from "../pages/InventoryPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CartPage } from "../pages/CartPage";
import { checkoutData } from "../data/checkoutData";

async function navigateToCheckout(page: Page) {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  await inventoryPage.addProductToCart("Sauce Labs Backpack");

  await inventoryPage.openCart();

  await cartPage.proceedToCheckout();
}
test("Successful checkout", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await navigateToCheckout(page);

  await checkoutPage.fillCheckoutInformation(checkoutData.validCustomer);

  await checkoutPage.finishOrder();

  await expect(checkoutPage.successMessage).toContainText("Thank you");

  await expect(page).toHaveURL(/checkout-complete/);
});
test("Checkout without first name", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await navigateToCheckout(page);

  await checkoutPage.fillCheckoutInformation({
    firstName: "",
    lastName: "Bolba",
    postalCode: "080123",
  });

  await expect(checkoutPage.errorMessage).toContainText(
    "First Name is required",
  );
});
test("Checkout without last name", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await navigateToCheckout(page);

  await checkoutPage.fillCheckoutInformation({
    firstName: "Florin",
    lastName: "",
    postalCode: "080123",
  });

  await expect(checkoutPage.errorMessage).toContainText(
    "Last Name is required",
  );
});
test("Checkout without postal code", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await navigateToCheckout(page);

  await checkoutPage.fillCheckoutInformation({
    firstName: "Florin",
    lastName: "Bolba",
    postalCode: "",
  });

  await expect(checkoutPage.errorMessage).toContainText(
    "Postal Code is required",
  );
});
test("Checkout multiple products", async ({ page }) => {
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
