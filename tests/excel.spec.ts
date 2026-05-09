import { test, expect } from "@playwright/test";
import { readFile, utils } from "xlsx";
import { join } from "path";

type LoginUser = { username: string; password: string };

const excelFile = join(__dirname, "..", "testdata", "testdatata.xlsx");
const workbook = readFile(excelFile);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const loginUsers = utils.sheet_to_json<LoginUser>(worksheet, {
  defval: "",
  blankrows: false,
});

const isValidUser = (user: LoginUser) =>
  user.username === "standard_user" && user.password === "secret_sauce";

const saucedemoLoginUrl = "https://www.saucedemo.com/";

test.describe("Sauce Demo login from Excel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(saucedemoLoginUrl);
  });

  for (const user of loginUsers) {
    const caseName = user.username || "<empty username>";
    test(`Excel login row: ${caseName}`, async ({ page }) => {
      await page.fill("#user-name", user.username);
      await page.fill("#password", user.password);
      await page.click("#login-button");

      if (isValidUser(user)) {
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator(".inventory_list")).toBeVisible({ timeout: 5000 });
      } else {
        const error = page.locator("[data-test=error]");
        await expect(error).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(saucedemoLoginUrl);
      }
    });
  }
});
