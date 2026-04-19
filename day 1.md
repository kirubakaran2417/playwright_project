# DAY 1 — INTRO + TYPESCRIPT BASICS + SETUP

### The Story So Far...

Imagine you are a new QA engineer joining a fintech startup. Your manager walks in on Day 1 and says:
"We need to automate 200 test cases. Manual testing is slowing us down. Every release takes 3 days of regression. We're losing money."
You open your laptop. You have heard of Selenium. But your senior says: "We use Playwright now. It's faster, smarter, and built for the modern web."
This is Day 1. Let's understand WHY before we touch code.

## SECTION 1 — What is Automation Testing?

### The Problem with Manual Testing
Every time a developer pushes a new feature, someone has to:

- Open the browser
- Log in
- Click through 50 screens
- Check that nothing is broken
- Write a report

If you have 200 test cases and a release every week, a team of 3 manual testers simply cannot keep up. They get tired, they miss things, they make mistakes at 6 PM on a Friday.

Automation Testing is the practice of writing code that does this clicking, typing, and verifying — automatically, consistently, in seconds.

- **Manual Test Run**: 3 days, 3 people, human errors
- **Automated Run**: 8 minutes, 0 people, zero fatigue

### What Does an Automation Script Actually Do?
At its core, a test script does exactly what a human tester does — just in code:

```text
Human Tester:                    Automation Script:
─────────────────────────────────────────────────────
Open Chrome                  →   browser.newPage()
Go to login page             →   page.goto("https://...")
Type username                →   page.fill("#username", "user")
Click Login button           →   page.click("#login-btn")
Check dashboard appeared     →   expect(page).toHaveURL("/dashboard")
```

## SECTION 2 — Why Playwright vs Selenium

### The Selenium Era
Selenium has been the industry standard since 2004. It works. Millions of tests run on it. But it was built for a web that no longer exists — a web of simple HTML pages, not React SPAs, WebSockets, and dynamic content.

Here is the core architectural problem with Selenium:

```text
Your Test Code
     ↓
  WebDriver Protocol (HTTP calls)
     ↓
  Browser Driver (chromedriver.exe)
     ↓
  Chrome Browser
```

Every single command — click, type, find element — goes through this HTTP bridge. That creates:

- **Timing issues**: The page loads faster than Selenium expects, or Selenium checks before the element is ready
- **Flakiness**: Tests pass today, fail tomorrow for no clear reason
- **Maintenance hell**: ChromeDriver version must match Chrome version exactly

### The Playwright Way
Playwright was built by Microsoft in 2020. It was written by ex-Puppeteer engineers who understood the modern browser deeply.

```text
Your Test Code
     ↓
  Playwright (talks directly via Chrome DevTools Protocol)
     ↓
  Chrome / Firefox / Safari (all three, same API)
```

No middleman. Playwright speaks the browser's native language.

### Head-to-Head Comparison

| Feature | Selenium | Playwright |
| :--- | :--- | :--- |
| **Architecture** | WebDriver (HTTP bridge) | CDP / native protocol |
| **Auto-wait** | ❌ Manual waits needed | ✅ Built-in smart waits |
| **Multi-browser** | Requires separate drivers | Single install, all browsers |
| **Speed** | Slower due to HTTP overhead | Significantly faster |
| **Flakiness** | High (timing issues) | Low (auto-wait handles it) |
| **API testing** | Not supported | ✅ Built-in |
| **Network mocking** | Complex setup | ✅ Native support |
| **Screenshot/Video** | Plugin-based | ✅ Out of the box |
| **Language support** | Java, Python, JS, C# | JS, TS, Python, Java, C# |
| **Community (2024)** | Mature, large | Fast-growing, modern |

### A Real Story: The Flaky Login Test
In Selenium, this was common:

```java
// Selenium — classic race condition
driver.findElement(By.id("username")).sendKeys("admin");
driver.findElement(By.id("password")).sendKeys("secret");
driver.findElement(By.id("login-btn")).click();
// Did the dashboard load? WHO KNOWS. Let's add a sleep just in case.
Thread.sleep(3000); //  every Selenium dev has written this
assertTrue(driver.getTitle().contains("Dashboard"));
```

The same test in Playwright:

```typescript
// Playwright — no sleep, no drama
await page.fill("#username", "admin");
await page.fill("#password", "secret");
await page.click("#login-btn");
await expect(page).toHaveURL("/dashboard"); // waits automatically
```

Playwright knows the page is still loading. It waits. It retries. It does not give up after 1 millisecond like Selenium does.

## SECTION 3 — Playwright Architecture (Deep Dive)

### How Playwright Talks to the Browser
Modern browsers expose a DevTools Protocol — the same protocol Chrome DevTools uses when you press F12. Playwright hooks into this directly.

```text
┌─────────────────────────────────────────────┐
│              Your Test (TypeScript)          │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│           Playwright Node.js Library         │
│  - Manages browser lifecycle                 │
│  - Handles events                            │
│  - Auto-wait engine                          │
└──────────────────┬──────────────────────────┘
                   │  Chrome DevTools Protocol (WebSocket)
                   ▼
┌─────────────────────────────────────────────┐
│              Browser Process                 │
│   Chromium / Firefox / WebKit               │
└─────────────────────────────────────────────┘
```

### The Auto-Wait Engine — The Most Important Concept
When you write `page.click("#submit")`, Playwright does NOT immediately fire a click. It runs through a checklist first:

**Playwright's internal checklist before every action:**
═══════════════════════════════════════════════════
- ✅ Is the element attached to the DOM?
- ✅ Is the element visible? (not display:none, opacity:0)
- ✅ Is the element stable? (not animating / moving)
- ✅ Is the element enabled? (not disabled attribute)
- ✅ Is the element not covered by another element?
- ✅ Is the element receiving pointer events?

Only after ALL checks pass → action executes.
If any check fails, Playwright retries for up to the configured timeout (default 30 seconds). This is why Playwright tests are far less flaky.

### Browser, Context, Page — The Three Layers
This is a concept beginners often confuse. Think of it like a real browser:

- **Browser** (the application itself — Chrome)
  - **BrowserContext** (an incognito window — isolated session, cookies, storage)
    - **Page** (a tab inside that window)

In code:

```typescript
const browser = await chromium.launch();          // Open Chrome
const context = await browser.newContext();        // Open incognito window
const page    = await context.newPage();           // Open a new tab
await page.goto("https://www.saucedemo.com");      // Navigate
```

Why does this matter? Because each BrowserContext is completely isolated. If you run 10 tests in parallel, each gets its own context — no cookie sharing, no session leaking between tests. This is how Playwright achieves true test isolation.

## SECTION 4 — TypeScript Basics (Only What You Need)

### Why TypeScript, Not JavaScript?
JavaScript is what runs in browsers. TypeScript is JavaScript with a type system added on top.

- **JavaScript**: You discover bugs at RUNTIME (when the test fails at 2 AM)
- **TypeScript**: You discover bugs at COMPILE TIME (VS Code shows red underline immediately)

Think of TypeScript as JavaScript with a senior developer looking over your shoulder, saying "Hey, you're passing a number where a string is expected."

### 4.1 Variables & Types
In JavaScript, variables have no type. In TypeScript, you declare the type:

```typescript
// JavaScript — wild west
let username = "standard_user";
username = 99;  // valid! no error. dangerous.

// TypeScript — discipline
let username: string = "standard_user";
username = 99;  // ❌ ERROR: Type 'number' is not assignable to type 'string'
```

The core types you will use every day in Playwright:

```typescript
// string — for URLs, selectors, usernames, expected text
let baseURL: string = "https://www.saucedemo.com";
let username: string = "standard_user";
let pageTitle: string = "Swag Labs";

// number — for counts, timeouts, prices
let timeout: number = 30000;      // 30 seconds in milliseconds
let productCount: number = 6;
let price: number = 29.99;

// boolean — for flags, conditions
let isLoggedIn: boolean = false;
let headless: boolean = true;

// TypeScript can also INFER the type — you don't always have to write it
let retries = 2;          // TypeScript sees this is a number automatically
let appName = "SauceDemo"; // TypeScript sees this is a string
```

Real Playwright config usage:

```typescript
// playwright.config.ts — types everywhere
const config = {
  timeout: 30000,           // number
  retries: 2,               // number
  headless: true,           // boolean
  baseURL: "https://...",   // string
};
```

### 4.2 Functions & Arrow Functions
A function is a named block of reusable code.

Traditional function:

```typescript
function greetUser(name: string): string {
  return "Hello, " + name;
}

console.log(greetUser("Kiruba")); // Hello, Kiruba
```

Breaking down the syntax:

```text
function greetUser  (name: string)  :  string  {
│        │           │               │
│        │           │               └── return type
│        │           └── parameter with type
│        └── function name
└── keyword
```

Arrow function (modern style — used everywhere in Playwright):

```typescript
// Arrow function — same thing, shorter syntax
const greetUser = (name: string): string => {
  return "Hello, " + name;
};

// Even shorter when only one expression
const greetUser = (name: string): string => "Hello, " + name;
```

Real Playwright example — a reusable login function:

```typescript
// utils/loginHelper.ts
async function loginAs(page: Page, username: string, password: string): Promise<void> {
  await page.goto("https://www.saucedemo.com");
  await page.fill("#user-name", username);
  await page.fill("#password", password);
  await page.click("#login-button");
}

// Using it in a test
await loginAs(page, "standard_user", "secret_sauce");
```

Notice `async` and `Promise<void>` — we will cover that next.

### 4.3 Arrays & Objects
Arrays — ordered lists of items:

```typescript
// An array of test users
const testUsers: string[] = [
  "standard_user",
  "locked_out_user",
  "problem_user",
  "performance_glitch_user"
];

// Accessing items (0-indexed)
console.log(testUsers[0]);  // standard_user
console.log(testUsers[1]);  // locked_out_user

// Looping through — you will do this for data-driven tests
for (const user of testUsers) {
  console.log(`Running test for: ${user}`);
}
// Output:
// Running test for: standard_user
// Running test for: locked_out_user
// Running test for: problem_user
// Running test for: performance_glitch_user

// Useful array methods
console.log(testUsers.length);          // 4
console.log(testUsers.includes("standard_user")); // true
```

Objects — key-value pairs, like a real-world entity:

```typescript
// A user object — models a real test data entity
const user = {
  username: "standard_user",
  password: "secret_sauce",
  role: "buyer",
  isActive: true
};

// Accessing properties
console.log(user.username);   // standard_user
console.log(user.password);   // secret_sauce

// Typed object using an interface (TypeScript superpower)
interface TestUser {
  username: string;
  password: string;
  role: string;
  isActive: boolean;
}

const adminUser: TestUser = {
  username: "admin",
  password: "admin123",
  role: "admin",
  isActive: true
};
```

Array of objects — this is how test data files look in real frameworks:

```typescript
// test-data/users.ts
const users: TestUser[] = [
  { username: "standard_user",          password: "secret_sauce", role: "buyer",  isActive: true  },
  { username: "locked_out_user",        password: "secret_sauce", role: "buyer",  isActive: false },
  { username: "performance_glitch_user",password: "secret_sauce", role: "buyer",  isActive: true  },
];

// In a test — loop over all users
for (const user of users) {
  test(`Login test for ${user.username}`, async ({ page }) => {
    await page.fill("#user-name", user.username);
    await page.fill("#password", user.password);
    await page.click("#login-button");
  });
}
```

### 4.4 async/await — The Most Important Concept for Playwright
This is where most beginners struggle. Take your time here.

**The Problem**: Browser actions take time
When you click a button, the browser has to:

- Find the element
- Scroll to it
- Fire the click event
- Wait for the network response
- Re-render the DOM

This takes time. You cannot write code that assumes it is instant.

The wrong mental model (synchronous thinking):

```typescript
// ❌ This is NOT how Playwright works
page.goto("https://www.saucedemo.com");   // Does this finish before the next line?
page.fill("#user-name", "standard_user"); // If not, the element doesn't exist yet!
page.click("#login-button");              // CRASH
```

The JavaScript engine's actual problem:
Without `async/await`, JavaScript would fire all three commands almost simultaneously. The page hasn't loaded when `fill()` is called. The element doesn't exist yet. Everything crashes.

Promises — how JavaScript models future values:

```typescript
// A Promise is a contract: "I will give you a value... eventually"
const titlePromise: Promise<string> = page.title();
// titlePromise is NOT a string yet — it's a promise of a string

// To get the actual value, you have to .then()
titlePromise.then(title => {
  console.log(title); // Now you have the real string
});
```

This works but becomes unreadable when you chain many operations:

```typescript
// ❌ Callback hell — unreadable
page.goto("https://www.saucedemo.com")
  .then(() => page.fill("#user-name", "standard_user"))
  .then(() => page.fill("#password", "secret_sauce"))
  .then(() => page.click("#login-button"))
  .then(() => page.title())
  .then(title => console.log(title));
```

`async/await` — syntactic sugar that makes Promises readable:

```typescript
// ✅ async/await — reads like synchronous code, works asynchronously
async function runLoginTest() {
  await page.goto("https://www.saucedemo.com");   // WAIT until page loads
  await page.fill("#user-name", "standard_user"); // WAIT until filled
  await page.fill("#password", "secret_sauce");   // WAIT until filled
  await page.click("#login-button");              // WAIT until clicked
  const title = await page.title();               // WAIT until title retrieved
  console.log(title);                             // NOW print it
}
```

**Rules to memorize:**
1. If a function uses `await` inside it, the function itself must be declared `async`
2. Every Playwright method (`goto`, `click`, `fill`, etc.) returns a Promise — always `await` them
3. `await` pauses execution of THAT FUNCTION only, not the whole program

Analogy that clicks:

```text
Without await:  You order coffee, don't wait, immediately try to drink from an empty cup.
With await:     You order coffee, wait for the barista, then drink.

page.click()         = placing the order
await page.click()   = placing the order AND waiting for it to be ready
```

## ⚙️ SECTION 5 — Environment Setup

### 5.1 Node.js & npm
Playwright runs on Node.js — the JavaScript runtime that allows JS to run outside the browser.
Check if already installed:

```bash
node --version    # Should show v18.x or higher
npm --version     # Should show 9.x or higher
```

npm (Node Package Manager) is the tool that downloads libraries. Think of it like pip for Python or Maven for Java.
Key npm concepts:

```bash
npm init          # Creates package.json (project manifest)
npm install X     # Downloads library X into node_modules/
npm run test      # Runs the "test" script defined in package.json
```

### 5.2 Installing Playwright

```bash
# Create a new project folder
mkdir playwright-saucedemo
cd playwright-saucedemo

# Initialize Playwright (interactive setup)
npm init playwright@latest
```

The installer will ask you questions:

```text
✔ Do you want to use TypeScript or JavaScript?  › TypeScript
✔ Where to put your end-to-end tests?           › tests
✔ Add a GitHub Actions workflow?                › false  (Day 10 topic)
✔ Install Playwright browsers?                  › true
```

This generates:

```text
playwright-saucedemo/
├── node_modules/          ← Downloaded libraries (never edit manually)
├── tests/
│   └── example.spec.ts    ← Sample test file
├── playwright.config.ts   ← Master configuration file
├── package.json           ← Project manifest (scripts, dependencies)
├── package-lock.json      ← Exact dependency versions (commit this)
└── tsconfig.json          ← TypeScript configuration
```

### 5.3 Project Structure (Understand Every File)

**`package.json`**:

```json
{
  "name": "playwright-saucedemo",
  "version": "1.0.0",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.44.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

**`playwright.config.ts`** (simplified Day 1 version):

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Where are your test files?
  testDir: "./tests",

  // Run tests in parallel
  fullyParallel: true,

  // How many times to retry a failing test?
  retries: 0,

  // Default timeout per test (30 seconds)
  timeout: 30000,

  // Reporter — how results are shown
  reporter: "html",

  use: {
    // Your app's base URL — tests use this with relative paths
    baseURL: "https://www.saucedemo.com",

    // Capture screenshot on failure
    screenshot: "only-on-failure",

    // Record video on failure
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
```

**`tsconfig.json`**:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist"
  },
  "include": ["tests/**/*.ts", "*.ts"]
}
```

## 🧪 SECTION 6 — Hands-On: Your First Real Test

### The Story Continues...
Your manager says: *"Before we automate anything complex, prove to me Playwright is working. Open SauceDemo and verify the page title. That's Day 1's deliverable."*

### Test 1: Verify Page Title
Create `tests/day1-intro.spec.ts`:

```typescript
import { test, expect } from "@playwright/test";

// test() defines a single test case
// The first argument is the test name
// The second argument is an async function that receives { page }
test("Verify SauceDemo page title", async ({ page }) => {
  // Navigate to the application
  await page.goto("https://www.saucedemo.com");

  // Get the page title
  const title = await page.title();

  // Print it (visible in terminal with --headed mode)
  console.log("Page title is:", title);

  // Assert — if this fails, the test fails
  expect(title).toBe("Swag Labs");
});
```

Run it:

```bash
npx playwright test day1-intro.spec.ts --headed
```

You will see Chrome open, navigate to SauceDemo, and close. In the terminal:

```text
Running 1 test using 1 worker
  ✓  tests/day1-intro.spec.ts:4:1 › Verify SauceDemo page title (1.2s)
  1 passed (2.1s)
```

### Test 2: Verify URL as Well

```typescript
import { test, expect } from "@playwright/test";

test("Verify SauceDemo landing page", async ({ page }) => {
  // Navigate
  await page.goto("https://www.saucedemo.com");

  // Assert page title
  await expect(page).toHaveTitle("Swag Labs");

  // Assert current URL
  await expect(page).toHaveURL("https://www.saucedemo.com/");

  // Check the login button is visible
  const loginButton = page.locator("#login-button");
  await expect(loginButton).toBeVisible();

  console.log("✅ SauceDemo landing page verified successfully");
});
```

### Test 3: Multiple Browser Test (Real Power of Playwright)

```typescript
import { test, expect } from "@playwright/test";

// This single test will run on Chrome, Firefox, and Safari
// because of the projects config in playwright.config.ts
test("Cross-browser: SauceDemo title check", async ({ page, browserName }) => {
  await page.goto("https://www.saucedemo.com");

  const title = await page.title();
  console.log(`Running on: ${browserName} | Title: ${title}`);

  await expect(page).toHaveTitle("Swag Labs");
});
```

Run on all configured browsers:

```bash
npx playwright test day1-intro.spec.ts
```

Output:

```text
Running 3 tests using 3 workers

  ✓  [chromium] › tests/day1-intro.spec.ts › Cross-browser title check (1.1s)
  ✓  [firefox] › tests/day1-intro.spec.ts › Cross-browser title check (1.8s)
  ✓  [webkit] › tests/day1-intro.spec.ts › Cross-browser title check (1.5s)

  3 passed (4.2s)
```

3 browsers. 3 tests. 4 seconds. Try doing that manually.

### View the HTML Report

```bash
npx playwright show-report
```

This opens a beautiful HTML report in your browser showing:

- Which tests passed/failed
- How long each took
- Screenshots of failures
- Full error messages with stack traces

## 📋 Day 1 Summary
**What you learned today:**
════════════════════════════════════════════════════════

- 🔸 **Automation Testing**
  - Manual testing doesn't scale; automation is the answer
  - Automation code mimics exactly what a human tester does

- 🔸 **Playwright vs Selenium**
  - Playwright = direct CDP protocol, no WebDriver overhead
  - Auto-wait engine = built-in stability, no Thread.sleep()
  - Single install for Chrome + Firefox + Safari

- 🔸 **Playwright Architecture**
  - Browser → Context → Page (three layers, each isolated)
  - Auto-wait checklist: attached, visible, stable, enabled, not covered

- 🔸 **TypeScript Basics**
  - Types: string, number, boolean — catch errors before runtime
  - Functions & arrow functions — building blocks of reusable code
  - Arrays & objects — how test data is structured
  - async/await — ESSENTIAL: every Playwright method is async

- 🔸 **Setup**
  - npm init playwright@latest → full project scaffolded
  - playwright.config.ts → master control of all test settings
  - package.json scripts → how you run tests

- 🔸 **First Tests Written**
  - Verified SauceDemo title and URL
  - Ran same test across 3 browsers with zero extra code