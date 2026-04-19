import { test, expect } from '@playwright/test';

test.describe("Login page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://playwright.dev/");
    })
    test("valid user login", async ({ page }) => {
        await expect(page).toHaveTitle(/Playwright/);
    })
    test("invalid user login", async ({ page }) => {
        await expect(page).toHaveTitle(/Playwright/);
    })
    test("empty user login", async ({ page }) => {
        await expect(page).toHaveTitle(/Playwright/);
    })
})

test.describe("sauce demo Login Suite", () => {
    test.beforeAll(async ({ page }) => {
        console.log("Test suite starting - one time setup") //good for db setup and mocking server
    })
    test.beforeEach(async ({ page }) => {
        console.log("Test case starting - redirecting to login page") //good for login
    })
    test("valid user login", async ({ page }) => {
        await expect(page).toHaveTitle(/Playwright/);
    })
    test("invalid user login", async ({ page }) => {
        await expect(page).toHaveTitle(/Playwright/);
    })
    test("empty user login", async ({ page }) => {
        await expect(page).toHaveTitle(/Playwright/);
    })
})