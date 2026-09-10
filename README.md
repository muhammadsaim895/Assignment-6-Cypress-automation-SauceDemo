# SauceDemo Cypress Automation

End-to-end UI automation suite for [SauceDemo](https://www.saucedemo.com/), built with [Cypress](https://www.cypress.io/) and structured around the **Page Object Model (POM)**.

Built for the 10Pearls QA Internship — **Assignment 6: Cypress Automation**. SauceDemo is a purpose-built practice app for test automation (it's the same site most Cypress/Selenium courses use), so this project leans on its stable `data-test` attributes rather than guessing at CSS classes.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) | Browser automation & test runner |
| Node.js | Runtime |
| Page Object Model | Test architecture pattern |
| Custom Cypress Commands | Reusable login/logout/cart steps |

---

## Project Structure

```
cypress-saucedemo-automation/
├── cypress/
│   ├── e2e/
│   │   ├── login-failure.cy.js       # Task 2: invalid login scenarios
│   │   ├── login-success.cy.js       # Task 3: valid login + homepage checks
│   │   └── product-navigation.cy.js  # Task 4: product listing + detail pages
│   ├── pages/
│   │   ├── LoginPage.js              # Task 6: login screen locators/actions
│   │   ├── InventoryPage.js          # Task 6: homepage/product listing
│   │   └── ProductPage.js            # Task 6: individual product details page
│   ├── fixtures/
│   │   └── users.json                # Valid/invalid/locked-out test credentials
│   └── support/
│       ├── commands.js               # Task 5: cy.login(), cy.logout(), etc.
│       └── e2e.js                    # Loads custom commands before every spec
├── cypress.config.js
├── package.json
└── README.md
```

---

## Why Page Object Model + Custom Commands?

Each screen of the app (Login, Inventory, Product Details) has its own class in `/cypress/pages`, holding that screen's locators and actions. Tests read like a script instead of a pile of selectors:

```js
cy.loginAsStandardUser();
InventoryPage.verifyHomepageLoaded();
InventoryPage.openProduct('Sauce Labs Backpack');
ProductPage.verifyProductPageLoaded('Sauce Labs Backpack');
```

On top of that, `cypress/support/commands.js` wraps the most-repeated actions (logging in, logging out, adding a product to the cart) as custom Cypress commands, so specs call `cy.loginAsStandardUser()` once instead of re-typing the same 4 lines in every test file.

---

## Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node)

### 2. Clone & install

```bash
git clone <this-repo-url>
cd cypress-saucedemo-automation
npm install
```

Cypress's own binary gets downloaded automatically as part of `npm install` — no separate install step needed (unlike Playwright's browsers).

---

## Running the Tests

### Interactive mode (Cypress Test Runner — recommended while writing/debugging)

```bash
npm run cy:open
```

This opens the Cypress App. Pick "E2E Testing", choose a browser, then click any spec file under `cypress/e2e/` to watch it run step-by-step in a real browser window, with time-travel debugging on every command.

### Headless mode (CI-style, runs everything and prints a summary)

```bash
npm test
```
or
```bash
npm run cy:run
```

### Run in a specific browser

```bash
npm run cy:run:chrome
```

### Where results go

- Videos of each run: `cypress/videos/` (gitignored — regenerated per run)
- Screenshots of any failure: `cypress/screenshots/` (gitignored)

---

## What the Suite Covers

| # | Task | Where |
|---|---|---|
| 1 | Project setup, Cypress Test Runner works | `cypress.config.js`, `package.json` |
| 2 | Login failure scenarios | `cypress/e2e/login-failure.cy.js` |
| 3 | Login success + homepage validation | `cypress/e2e/login-success.cy.js` |
| 4 | Product navigation & validation | `cypress/e2e/product-navigation.cy.js` |
| 5 | Reusable custom commands | `cypress/support/commands.js` |
| 6 | Page Object Model | `cypress/pages/LoginPage.js`, `InventoryPage.js`, `ProductPage.js` |

---

## Notes

- **Test data lives in one place.** `cypress/fixtures/users.json` holds every credential used across specs (valid, locked-out, invalid, empty) so there's no hard-coded username/password scattered through test files.
- **Locked-out user is covered on purpose.** SauceDemo ships a `locked_out_user` account specifically to test this kind of negative scenario, so Task 2 includes it alongside plain wrong-credentials and empty-field cases.
- **The sort-order test** (`product-navigation.cy.js`) is an extra check beyond the base requirements — it validates that SauceDemo's "Price (low to high)" sort actually returns prices in ascending order, not just that the dropdown exists.
- SauceDemo is a stable demo app maintained specifically for automation practice, so — unlike testing a live production site — these locators shouldn't drift the way a real e-commerce site's might.

---

## Author

**Muhammad Saim Ovais**
QA Automation Intern — 10Pearls
BS Software Engineering, IOBM

## Resources Used

- [Cypress Docs — Installing Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
- [10Pearls University — Test Automation with Cypress](https://10pearlsuniversity.org/courses/test-automation-with-cypress/)
