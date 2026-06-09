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
