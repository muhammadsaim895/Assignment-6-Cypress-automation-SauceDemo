/**
 * ProductPage
 * -------------
 * Represents /inventory-item.html?id=... — the detail page shown after
 * clicking a single product from the inventory listing. Covers the
 * rest of Task 4 (validating a product's own page loads with correct
 * details).
 */
class ProductPage {
  // ---- Locators ----
  get productName() {
    return cy.get('.inventory_details_name');
  }

  get productDescription() {
    return cy.get('.inventory_details_desc');
  }

  get productPrice() {
    return cy.get('.inventory_details_price');
  }

  get addToCartButton() {
    return cy.get('button[data-test^="add-to-cart"]');
  }

  get backToProductsButton() {
    return cy.get('#back-to-products');
  }

  // ---- Actions ----
  addToCart() {
    this.addToCartButton.click();
    return this;
  }

  goBackToProducts() {
    this.backToProductsButton.click();
    return this;
  }

  // ---- Assertions ----
  /**
   * Confirms the product details page actually loaded for the product
   * that was clicked — checks the name shown here matches what was
   * clicked on the inventory page, plus that description/price/URL
   * are all present.
   * @param {string} expectedName
   */
  verifyProductPageLoaded(expectedName) {
    cy.url().should('include', 'inventory-item.html');
    this.productName.should('be.visible').and('have.text', expectedName);
    this.productDescription.should('be.visible').and('not.be.empty');
    this.productPrice.should('be.visible').invoke('text').should('match', /^\$\d+\.\d{2}$/);
    return this;
  }
}

export default new ProductPage();
