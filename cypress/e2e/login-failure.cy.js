import LoginPage from '../pages/LoginPage';

/**
 * Login Failure Scenarios
 * ==========================
 * Task 2: verify the app correctly rejects bad credentials and shows
 * the right error message for each failure case, rather than just
 * checking the happy path works.
 */
describe('SauceDemo - Login Failure Scenarios', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('shows an error for an invalid username and password', () => {
    cy.fixture('users').then((users) => {
      LoginPage.enterUsername(users.invalidUser.username);
      LoginPage.enterPassword(users.invalidUser.password);
      LoginPage.clickLogin();
    });

    LoginPage.verifyErrorMessageContains(
      'Username and password do not match any user in this service'
    );
  });

  it('shows an error when the password field is left empty', () => {
    cy.fixture('users').then((users) => {
      LoginPage.enterUsername(users.validUser.username);
      LoginPage.clickLogin();
    });

    LoginPage.verifyErrorMessageContains('Password is required');
  });

  it('shows an error when the username field is left empty', () => {
    LoginPage.enterPassword('secret_sauce');
    LoginPage.clickLogin();

    LoginPage.verifyErrorMessageContains('Username is required');
  });

  it('shows a locked-out message for the locked_out_user account', () => {
    cy.fixture('users').then((users) => {
      LoginPage.enterUsername(users.lockedOutUser.username);
      LoginPage.enterPassword(users.lockedOutUser.password);
      LoginPage.clickLogin();
    });

    LoginPage.verifyErrorMessageContains('Sorry, this user has been locked out');
  });

  it('lets the user dismiss the error banner and try again', () => {
    cy.fixture('users').then((users) => {
      LoginPage.enterUsername(users.invalidUser.username);
      LoginPage.enterPassword(users.invalidUser.password);
      LoginPage.clickLogin();
    });

    LoginPage.errorMessage.should('be.visible');
    LoginPage.errorCloseButton.click();
    LoginPage.errorMessage.should('not.exist');
  });
});
