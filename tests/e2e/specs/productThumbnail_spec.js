describe('Product thumbnail', () => {
  before(() => {
    cy.visit('/products/women-shoes-ankle-boots/');
  });

  it('displays product information', () => {
    cy.get('[data-test=product-thumbnail-name]', { timeout: Cypress.config('graphqlTimeout') })
      .contains('Booties Lemare grey')
      .parentsUntil('[data-test=product-thumbnail]')
      .parent()
      .then(($thumbnail) => {
        cy.wrap($thumbnail)
          .find('img')
          .should('have.attr', 'src')
          .should('include', '.jpg');

        cy.wrap($thumbnail)
          .find('[data-test=product-thumbnail-sale-flag]')
          .should('exist');

        cy.wrap($thumbnail)
          .find('[data-test=price-old-value]')
          .contains(/^\s*248,75\s€\s*$/);

        cy.wrap($thumbnail)
          .find('[data-test=price-new-value]')
          .contains(/^\s*174,12\s€\s*$/);
      });

    cy.get('[data-test=product-thumbnail-name]')
      .contains('Booties Lemare black')
      .parentsUntil('[data-test=product-thumbnail]')
      .parent()
      .then(($thumbnail) => {
        cy.wrap($thumbnail)
          .find('[data-test=product-thumbnail-sale-flag]')
          .should('not.exist');

        cy.wrap($thumbnail)
          .find('[data-test=product-original-price]')
          .contains(/\s*231,25\s€\s*$/);

        cy.wrap($thumbnail)
          .find('[data-test=price-new-value]')
          .should('not.exist');
      });
  });
});
