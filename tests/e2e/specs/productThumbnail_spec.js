describe('Product thumbnail', () => {
  before(() => {
    cy.visit('/products/men/2');
  });

  it('displays product information', () => {
    cy.get('[data-test=product-thumbnail-name]', { timeout: Cypress.config('graphqlTimeout') })
      .contains('Sneakers New Balance multi')
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
          .contains(/^\s*120,00\s€\s*$/);

        cy.wrap($thumbnail)
          .find('[data-test=price-new-value]')
          .contains(/^\s*60,00\s€\s*$/);
      });
    cy.visit('/products/men/1');
    cy.get('[data-test=product-thumbnail-name]')
      .contains('Sneakers ”R261” Hogan Rebel grey')
      .parentsUntil('[data-test=product-thumbnail]')
      .parent()
      .then(($thumbnail) => {
        cy.wrap($thumbnail)
          .find('[data-test=product-thumbnail-sale-flag]')
          .should('not.exist');

        cy.wrap($thumbnail)
          .find('[data-test=product-original-price]')
          .contains(/\s*275,00\s€\s*$/);

        cy.wrap($thumbnail)
          .find('[data-test=price-new-value]')
          .should('not.exist');
      });
  });
});
