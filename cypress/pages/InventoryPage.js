/**
 * InventoryPage
 * ---------------
 * Represents /inventory.html — the homepage a user lands on right
 * after logging in. Covers the "homepage validation" half of Task 3
 * and most of Task 4 (product listing navigation/validation).
 */
class InventoryPage {
  // ---- Locators ----
  get pageTitle() {
    return cy.get('.title');
  }

  get productList() {
    return cy.get('.inventory_list .inventory_item');
  }

  get productNames() {
    return cy.get('.inventory_item_name');
  }

  get productPrices() {
    return cy.get('.inventory_item_price');
  }

  get cartIcon() {
    return cy.get('.shopping_cart_link');
  }

  get cartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  get menuButton() {
    return cy.get('#react-burger-menu-btn');
  }

  get logoutLink() {
    return cy.get('#logout_sidebar_link');
  }

  get sortDropdown() {
    return cy.get('.product_sort_container');
  }

  // ---- Actions ----
  openMenu() {
    this.menuButton.click();
    return this;
  }

  clickLogout() {
    this.logoutLink.click();
    return this;
  }

  /**
   * Clicks a product's name/title to open its individual details page.
   * @param {string} productName
   */
  openProduct(productName) {
    cy.contains('.inventory_item_name', productName).click();
    return this;
  }

  sortBy(optionValue) {
    this.sortDropdown.select(optionValue);
    return this;
  }

  // ---- Assertions ----
  verifyHomepageLoaded() {
    cy.url().should('include', '/inventory.html');
    this.pageTitle.should('be.visible').and('have.text', 'Products');
    return this;
  }

  verifyProductsAreDisplayed() {
    this.productList.should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Validates that every visible product card has a non-empty name
   * and a price formatted like "$29.99" — a lightweight sanity check
   * that the listing actually rendered real data, not empty shells.
   */
  verifyProductDetailsAreValid() {
    this.productList.each(($item) => {
      cy.wrap($item).find('.inventory_item_name').should('not.be.empty');
      cy.wrap($item)
        .find('.inventory_item_price')
        .invoke('text')
        .should('match', /^\$\d+\.\d{2}$/);
    });
    return this;
  }
}

export default new InventoryPage();
