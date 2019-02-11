describe('Product detail page', () => {
  before(() => {
    cy.visit('/product/lemare-booties-0778-grey/M0E20000000E0WX');
  });

  it('Displays a single product details', () => {
    cy.get('[data-test=product-data]', { timeout: 20000 })
      .then(($product) => {
        cy.wrap($product)
          .find('[data-test=product-name]')
          .should('contain', 'Booties Lemare grey');

        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'M0E20000000E0WX');

        cy.wrap($product)
          .find('[data-test=product-old-price]')
          .contains(/^\s*248,75\s€\s*$/);

        cy.wrap($product)
          .find('[data-test=product-new-price]')
          .contains(/^\s*174,12\s€\s*$/);

        cy.wrap($product)
          .find('[data-test=product-attributes-accordion]')
          .click();

        cy.wrap($product)
          .find('[data-test=product-attributes-list]')
          .should('have.length', 7)
          .eq(2)
          .contains(/^\s*size:\s+34\s*$/);
      });

    cy.get('[data-test=product-gallery]')
      .find('[data-test=product-image]')
      .should('exist');
  });
});
