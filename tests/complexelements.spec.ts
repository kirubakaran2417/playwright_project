import test, { expect } from '@playwright/test';

test.describe('Complex Elements', () => {
  test('should handle complex elements correctly', async ({ page }) => {
    //native drop down
    const dropdown = page.frameLocator('#iframeResult').locator('select');
    await dropdown.selectOption('saab');
    const selectedValue = await dropdown.inputValue();
    expect(selectedValue).toBe('saab');

    //custom drop down-country to state or sort a to z
    //click the dropdown
    const customDropdown = page.locator('.custom-select');
    await customDropdown.click();
    //wait for the menu to appear
    const dropdownMenu = page.locator('.custom-select .dropdown-menu');
    await expect(dropdownMenu).toBeVisible();
    //click the option
    const option = page.locator('.custom-select .dropdown-menu li[data-value="2"]');
    await option.click();

    //Navigate options with keyboard
    await customDropdown.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    //alert
    await page.click("#trigger-alert");
    page.on("dialog",dialog=>dialog.accept())

    page.on("dialog",dialog=>expect(dialog.message()).toBe("This is an alert!"));

    page.on("dialog",async dialog=>{
        await dialog.dismiss();     
    });
  });
});