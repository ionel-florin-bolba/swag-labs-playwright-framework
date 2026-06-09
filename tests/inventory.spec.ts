import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { users } from "../data/users";

test("inventory page displays products", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  const count = await inventoryPage.getProductsCount();

  expect(count).toBeGreaterThan(0);
});

test("Sort products A-Z", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  await inventoryPage.sortByAZ();

  expect(await inventoryPage.getFirstProductName()).toBe("Sauce Labs Backpack");
});

test("Sort products Z-A", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigate();
  await loginPage.login(users.standard);

  await inventoryPage.sortByZA();

  expect(await inventoryPage.getFirstProductName()).toBe(
    "Test.allTheThings() T-Shirt (Red)",
  );
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
