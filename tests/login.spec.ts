import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../data/users";

test.describe("Login Tests", () => {
  test("Successful login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(users.standard);

    await expect(page).toHaveURL(/inventory/);
  });

  test("Invalid login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(users.invalid);

    await expect(await loginPage.errorMessage()).toBeVisible();
  });

  test("Locked user", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(users.locked);

    await expect(await loginPage.errorMessage()).toContainText(
      "Sorry, this user has been locked out",
    );
  });

  test("Empty username", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login({
      username: "",
      password: "secret_sauce",
    });

    await expect(loginPage.errorMessage()).toContainText(
      "Username is required",
    );
  });

  test("Empty password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login({
      username: "standard_user",
      password: "",
    });

    await expect(loginPage.errorMessage()).toContainText(
      "Password is required",
    );
  });
});
