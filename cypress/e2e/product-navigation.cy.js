import InventoryPage from '../pages/InventoryPage';
import ProductPage from '../pages/ProductPage';

/**
 * Product Navigation & Validation
 * ===================================
 * Task 4: validate the product listing itself (names/prices render
 * correctly), then drill into an individual product page and confirm
 * its details match what was clicked.
 */
describe('SauceDemo - Product Navigation & Validation', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
    InventoryPage.verifyHomepageLoaded();
  });

  it('displays every product with a valid name and price', () => {
    InventoryPage.verifyProductDetailsAreValid();
  });

  it('opens a product details page and shows matching name, description, and price', () => {
    InventoryPage.productNames.first().then(($el) => {
      const productName = $el.text();

      InventoryPage.openProduct(productName);
      ProductPage.verifyProductPageLoaded(productName);
    });
  });

  it('allows navigating back to the product list from a product page', () => {
    InventoryPage.productNames.first().invoke('text').then((productName) => {
      InventoryPage.openProduct(productName);
      ProductPage.verifyProductPageLoaded(productName);

      ProductPage.goBackToProducts();
      InventoryPage.verifyHomepageLoaded();
    });
  });

  it('adds a product to the cart from its details page and updates the cart badge', () => {
    InventoryPage.productNames.first().invoke('text').then((productName) => {
      InventoryPage.openProduct(productName);
      ProductPage.addToCart();
      ProductPage.goBackToProducts();

      InventoryPage.cartBadge.should('have.text', '1');
    });
  });

  it('adds a product to the cart directly from the inventory listing', () => {
    cy.fixture('users').then(() => {
      cy.addProductToCartByName('Sauce Labs Backpack');
    });

    InventoryPage.cartBadge.should('have.text', '1');
  });

  it('sorts products by price low to high and displays them in ascending order', () => {
    InventoryPage.sortBy('lohi');

    InventoryPage.productPrices.then(($prices) => {
      const values = [...$prices].map((el) =>
        parseFloat(el.innerText.replace('$', ''))
      );
      const sorted = [...values].sort((a, b) => a - b);
      expect(values).to.deep.equal(sorted);
    });
  });
});
