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

//locator types
//1. locator() with css selector
//By ID --> page.locator("#user-name")   //matches <input id="user-name">
//By class --> page.locator(".btn")     //matches <button class="btn">
//By attribute --> page.locator("[data-test='username'])   //matches <input data-test="username">
//By element+attribute
//page.locator("input[name='username']")   //matches <input name="username">
//parent-child
//page.locator("form").locator("input[name='username']")   //matches <form><input name="username"></form>
//nth element
//page.locator("li").nth(0)   //matches the first <li> element
//combining:parent>child
//page.locator(".login-form input[name='username']")   
//matches 
// <div class="login-form">
// <input name="username">
// </div>
//getByRole() with ARIA role
//By role and name --> page.getByRole("button", { name: "Submit" })   //matches <button>Submit</button>
//different roles --> link,text box,heading,img
//case sensitive --> page.getByRole("button", { name: "Submit" , exact: false })   //matches <button>Submit</button> but not <button>submit</button>
//getByText() with text content
//By text --> page.getByText("Submit")   //matches <button>Submit</button>
//case sensitive --> page.getByText("Submit", { exact: false })   //matches <button>Submit</button> but not <button>submit</button>
//page.getByText("remove") //if multiple matches are found, it will return the first one
//page.locator(".login-form;").getByText("Submit")   //matches <button>Submit</button> but not <button>submit</button>
//getByTestId() with data-test id attribute
//By data-test id --> page.getByTestId("submit")   //matches <input data-test="submit">
//getbylabel,getbyplaceholder, getbyalt, getbytitle
//By label --> page.getByLabel("Username")   //matches <label for="username">Username</label><input id="username">
//By placeholder --> page.getByPlaceholder("Enter username")   //matches <input placeholder="Enter username">
//By alt --> page.getByAltText("User avatar")   //matches <img alt="User avatar">
//By title --> page.getByTitle("Submit button")   //matches <button title="Submit button">Submit</button>
//strict mode & chaining
//const backpackcard=page.locator(".backpack-card").filter({ hasText: "Backpack" })   //matches <backpack-card> that contains text "Backpack"`
//const backpackcard=page.locator(".backpack-card").filter({ has: page.getByText("Backpack") })   //matches <backpack-card> that contains an element with text "Backpack"

//get all the items in the cart
//const itemswithAddbutton=page.locator(".inventory_item").filter({ has: page.getByRole("button", { name: "Add to cart" }) })   //matches all the items that have an "Add to cart" button
// const count = await itemswithAddbutton.count();   //get the count of items with "Add to cart" button
// console.log(count);

//How many products are on inventory page
// const allproducts=page.locator(".inventory_item");   //matches all the products on inventory page
// const count = await allproducts.count();
// expect(count).toBe(6);
//xpath
//page.locator("//button[text()='Submit']")   //matches <button>Submit</button>
//page.locator("xpath=//input[@name='username']")   //matches <input name="username">
//page.locator("xpath=//div[@class='login-form
