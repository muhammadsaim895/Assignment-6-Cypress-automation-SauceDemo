import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

/**
 * Login Success Flow & Homepage Validation
 * ===========================================
 * Task 3: log in with valid credentials, confirm the redirect to the
 * inventory page, and check that the key homepage UI components are
 * actually visible — not just that the URL changed.
 */
describe('SauceDemo - Login Success & Homepage Validation', () => {
  it('logs in with valid credentials and lands on the inventory page', () => {
    cy.loginAsStandardUser();

    InventoryPage.verifyHomepageLoaded();
  });

  it('shows the product grid, cart icon, and sort dropdown after login', () => {
    cy.loginAsStandardUser();

    InventoryPage.verifyProductsAreDisplayed();
    InventoryPage.cartIcon.should('be.visible');
    InventoryPage.sortDropdown.should('be.visible');
    InventoryPage.menuButton.should('be.visible');
  });

  it('allows logging out and returns to the login screen', () => {
    cy.loginAsStandardUser();
    InventoryPage.verifyHomepageLoaded();

    cy.logout();

    LoginPage.verifyLoginPageDisplayed();
  });

  it('redirects back to the login page when visiting the homepage without logging in', () => {
    // SauceDemo blocks direct navigation to the inventory page for
    // unauthenticated sessions — this checks that guard is in place.
    cy.visit('/inventory.html');

    LoginPage.verifyErrorMessageContains('You can only access');
  });
});
