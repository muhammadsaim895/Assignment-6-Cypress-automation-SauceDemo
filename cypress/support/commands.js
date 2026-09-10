/**
 * Custom Commands
 * -----------------
 * Task 5: reusable steps used across multiple spec files so tests don't
 * repeat the same low-level interactions. Each command is intentionally
 * kept thin — it delegates to the page objects rather than duplicating
 * their locators, so there's still only one place a locator can break.
 */

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

/**
 * cy.login(username, password)
 * Logs in via the UI. Used at the start of almost every spec that
 * needs an authenticated session, so it lives here instead of being
 * copy-pasted into every test file.
 */
Cypress.Commands.add('login', (username, password) => {
  LoginPage.visit();
  LoginPage.enterUsername(username);
  LoginPage.enterPassword(password);
  LoginPage.clickLogin();
});

/**
 * cy.loginAsStandardUser()
 * Shorthand for the common case — most product/navigation tests don't
 * care about login itself, they just need to already be inside the app.
 */
Cypress.Commands.add('loginAsStandardUser', () => {
  cy.fixture('users').then((users) => {
    cy.login(users.validUser.username, users.validUser.password);
  });
});

/**
 * cy.logout()
 * Opens the hamburger menu and logs out, returning to the login page.
 */
Cypress.Commands.add('logout', () => {
  InventoryPage.openMenu();
  InventoryPage.clickLogout();
});

/**
 * cy.addProductToCartByName(name)
 * Finds a product card by its visible name and clicks its "Add to
 * cart" button, regardless of where it sits in the current sort order.
 */
Cypress.Commands.add('addProductToCartByName', (productName) => {
  cy.contains('.inventory_item', productName).within(() => {
    cy.get('button', { matchCase: false })
      .contains(/add to cart/i)
      .click();
  });
});
