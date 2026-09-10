/**
 * LoginPage
 * ----------
 * Represents https://www.saucedemo.com/ (the login screen). Covers
 * Task 2 (login failure) and the login half of Task 3 (login success).
 *
 * SauceDemo is a purpose-built practice app for test automation, so
 * its locators are exposed via stable `data-test` attributes — this
 * page object leans on those rather than classes/IDs, since data-test
 * attributes are the one thing this app promises won't change under
 * a redesign.
 */
class LoginPage {
  // ---- Locators ----
  get usernameInput() {
    return cy.get('[data-test="username"]');
  }

  get passwordInput() {
    return cy.get('[data-test="password"]');
  }

  get loginButton() {
    return cy.get('[data-test="login-button"]');
  }

  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  get errorCloseButton() {
    return cy.get('.error-button');
  }

  // ---- Actions ----
  visit() {
    cy.visit('/');
    return this;
  }

  enterUsername(username) {
    this.usernameInput.clear().type(username);
    return this;
  }

  enterPassword(password) {
    this.passwordInput.clear().type(password, { log: false });
    return this;
  }

  clickLogin() {
    this.loginButton.click();
    return this;
  }

  /**
   * Convenience method that fills both fields and submits in one call
   * — used directly by specs that don't need to inspect intermediate
   * field state.
   */
  login(username, password) {
    this.visit();
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
    return this;
  }

  // ---- Assertions ----
  verifyErrorMessageContains(text) {
    this.errorMessage.should('be.visible').and('contain.text', text);
    return this;
  }

  verifyLoginPageDisplayed() {
    cy.url().should('include', 'saucedemo.com');
    this.loginButton.should('be.visible');
    return this;
  }
}

export default new LoginPage();
