// Write a complete locator library for sauce demo login page and inventory page(https://www.saucedemo.com/)
// use the correct priority strategy for every element 
// then write test that prove each locator works

//testcases
// Locate elements using CSS ID selectors 
// locate element using data test attribute 
// locate using get by role locate using get by placeholder 
// locate logo using get by text full login using best practice 
// locators full login inventory page locators 
// locate specific product by using filter 
// locate using NTH element for specific positions 
// loop through all products and print details 
// Use Xpath

import { test, expect } from "@playwright/test";

test.describe("Day 3 - Login page locators", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });
  // Locate elements using CSS ID selectors 
  test("Locate elements using CSS ID selectors", async ({ page }) => {
    const usernameInput = page.locator("#user-name");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("#login-button");  

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });


});