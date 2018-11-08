describe('Product detail page', () => {
  before(() => {
    cy.visit('/product/lemare-booties-0778-grey/M0E20000000E0WX');
  });

  it('Displays a single product details', () => {
    cy.get('[data-test=pdp-product-title]', { timeout: 20000 })
      .contains('Booties Lemare grey')
      .parentsUntil('[data-test=product-description]')
      .parent()
      .find('[data-test=quickview-sku]')
      .contains('M0E20000000E0WX')
      .parentsUntil('[data-test=product-description]')
      .parent()
      .then(($product) => {
        cy.wrap($product)
          .find('[data-test=product-discounted-price]')
          .should('contain', '248,75 €');
        cy.wrap($product)
          .find('[data-test=product-discount-price]')
          .should('contain', '174,12 €');

        cy.wrap($product)
          .find('[data-test=add-to-cart-button]')
          .should('exist');

        cy.wrap($product)
          .find('[data-test=panel-default]')
          .should('exist')
          .find('[data-test=accordion-toggle]')
          .click();

        cy.wrap($product)
          .find('[data-test=list-attributes]')
          .should('have.length', 7)
          .eq(2)
          .should('contain', 'size:')
          .parent()
          .should('contain', '34');
      });

    cy.get('[data-test=product-gallery]')
      .find('[data-test=product-image]')
      .should('exist');

    cy.get('.thumb-list > .responsive-image')
      .should('have.length', 2);
  });
});
