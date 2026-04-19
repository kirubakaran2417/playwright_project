import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
test("understanding fixtures", async ({
  page,      //A new browser tab is created for each test
  context,   //A new browser context is created for each test
  browser,   //A new browser is created for each test
  request,   //A new request is created for each test
  browserName //The name of the browser
}) => {
  console.log(`Running on: ${browserName}`);

})