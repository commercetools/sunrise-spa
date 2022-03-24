describe('Store locator', () => {
  before(() => {
    cy.visit('/stores');
  });

  it('Select store', () => {
    // select Berlin store
    cy.get('#place-input', {
      timeout: Cypress.config('graphqlTimeout'),
    })
      .clear()
      .type('berlin germany');
    cy.get('.pac-icon.pac-icon-marker', {
      timeout: Cypress.config('graphqlTimeout'),
    })
      .eq(0)
      .click();
    cy.get(`[data-test="store-name"]`).should(
      'contain',
      'SUNRISE Store Berlin'
    );
    cy.get('[data-test="select-store"]').click();
    // check if Berlin store price is used in product detail and cart
    cy.visit(
      '/product/havaianas-flipflops-brasil-grey/M0E20000000ELBX'
    );
    cy.get('[data-test="product-original-price"]').should(
      'contain',
      '21,60'
    );
    cy.get('[data-test="add-to-cart-button"]').click();
    cy.get('[data-test="mini-cart-open-button"]').should(
      'contain',
      '1'
    );
    cy.visit('/cart');
    cy.get('[data-test="item-price"]').should(
      'contain',
      '21,60'
    );
    // check if store selector opens with Berlin store
    cy.visit('/stores');
    cy.get('[data-test="store-name"]').should(
      'contain',
      'SUNRISE Store Berlin'
    );
    cy.get('[data-test="unselect-store"]').click();
    // show product detail with correct price (not Berlin store)
    cy.visit(
      '/product/havaianas-flipflops-brasil-grey/M0E20000000ELBX'
    );
    cy.get('[data-test="product-original-price"]').should(
      'contain',
      '24,00'
    );
  });
});
