// import { test, expect } from '@playwright/test';
// //Navigation

// await page.goto("https://playwright.dev/");     //Navigate to the URL
// await page.goBack();                            //Navigate back
// await page.goForward();                         //Navigate forward
// await page.reload();                            //Reload the page
// await page.reload({ waitUntil: "domcontentloaded" }); //Reload the page with specific condition


// //Information

// await page.title();                                 //Get the title of the page
// await page.url();                                   //Get the URL of the page
// await page.content();                               //Get the content of the page
// await page.screenshot();                             //Take a screenshot of the page
// await page.video();                                 //Get the video of the page

// //Finding elements

// await page.locator("selector");                     //Find an element by selector
// await page.getByRole("button", { name: "Submit" });   //Find an element by role
// await page.getByText("Submit");                     //Find an element by text
// await page.getByTestId("submit");                   //Find an element by data-test id attribute

// //interactions

// await page.fill("selector", "value");               //Fill an element with value
// await page.click("selector");                       //Click an element
// await page.hover("selector");                       //Hover over an element
// await page.press("selector", "Enter");              //Press a key on an element
// await page.check("selector");                       //Check an element
// await page.uncheck("selector");                     //Uncheck an element
// await page.selectOption("selector", "value");       //Select an option from a dropdown
// await page.selectValue("selector", "value");        //Select an option from a dropdown by value
// await page.selectText("selector", "value");         //Select an option from a dropdown by text
// await page.selectIndex("selector", 0);              //Select an option from a dropdown by index
// await page.selectMultiple("selector", ["value1", "value2"]); //Select multiple options from a dropdown

// //assertions

// await expect(page).toHaveTitle(/Playwright/);        //Expect the title to contain a substring
// await expect(page).toHaveURL(/Playwright/);         //Expect the URL to contain a substring
// await expect(page).toHaveText("Submit");            //Expect the page to contain text
// await expect(page).toHaveValue("Submit");           //Expect the page to have value
// await expect(page).toBeVisible();                   //Expect the page to be visible
// await expect(page).toBeHidden();                    //Expect the page to be hidden
// await expect(page).toBeEnabled();                   //Expect the page to be enabled
// await expect(page).toBeDisabled();                  //Expect the page to be disabled
// await expect(page).toBeChecked();                   //Expect the page to be checked
// await expect(page).toBeUnchecked();                 //Expect the page to be unchecked
// await expect(page).toBeSelected();                  //Expect the page to be selected
// await expect(page).toBeNotSelected();               //Expect the page to be not selected
// await expect(page).toBeVisible();                   //Expect the page to be visible
// await expect(page).toBeHidden();                    //Expect the page to be hidden
// await expect(page).toBeEnabled();                   //Expect the page to be enabled
// await expect(page).toBeDisabled();                  //Expect the page to be disabled
// await expect(page).toBeChecked();                   //Expect the page to be checked
// await expect(page).toBeUnchecked();                 //Expect the page to be unchecked
// await expect(page).toBeSelected();                  //Expect the page to be selected
// await expect(page).toBeNotSelected();               //Expect the page to be not selected