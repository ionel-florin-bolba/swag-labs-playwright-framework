import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../data/users";

test("Successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(users.standard);

  await expect(page).toHaveURL(/inventory/);
});
