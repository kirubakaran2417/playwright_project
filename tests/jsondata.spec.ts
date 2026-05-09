import { test, expect } from "@playwright/test";
import usersData from "../testdata/users.json"; 

const saucedemoLoginUrl = "https://www.saucedemo.com/";

test.describe("Sauce Demo login with JSON data", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(saucedemoLoginUrl);
  });

  for (const user of usersData.validUsers) {
    test(`valid user login: ${user.username} @regression`, async ({ page }) => {
      await page.fill("#user-name", user.username);
      await page.fill("#password", user.password);
      await page.click("#login-button");

      await expect(page).toHaveURL(new RegExp(user.expectURL));
      await expect(page.locator(".inventory_list")).toBeVisible({ timeout: 5000 });
    });
  }

  for (const user of usersData.invalidUsers) {
    test(`invalid user login: ${user.username || "<empty username>"} @regression`, async ({ page }) => {
      await page.fill("#user-name", user.username);
      await page.fill("#password", user.password);
      await page.click("#login-button");

      const error = page.locator("[data-test=error]");
      await expect(error).toHaveText(user.expectError);
    });
  }
});
