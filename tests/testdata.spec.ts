import {test, expect} from "@playwright/test";

//inline data-used for small,simple data sets
const validUsers = [
    {username: "standard_user", password: "secret_sauce", expectURL: /inventory.html/},
    {username: "performance_user", password: "password2", expectURL: /inventory.html/},
    {username: "user3", password: "password3", expectURL: /inventory.html/}
];

for (const user of validUsers) {
    test(`Login: ${user.username} should login successfully`, async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
        await page.fill("#user-name", user.username);
        await page.fill("#password", user.password);
        await page.click("#login-button");
       await page.waitForURL(user.expectURL,{timeout: 5000});
       await expect(page.locator(".inventory_list")).toBeVisible({timeout: 5000});

    });
}