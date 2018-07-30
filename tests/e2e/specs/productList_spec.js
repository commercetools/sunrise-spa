describe('Product list', () => {
  before(() => {
    cy.visit('/#/products/women-shoes-ankle-boots/');
  });

  it('displays products information', () => {
    cy.get('[data-test=product-thumbnail-name]', { timeout: 10000 })
      .contains('Booties Lemare grey')
      .parentsUntil('[data-test=product-thumbnail]')
      .parent()
      .then(($thumbnail) => {
        cy.wrap($thumbnail)
          .find('img')
          .should('have.attr', 'src')
          .should('include', '.jpg');

        cy.wrap($thumbnail)
          .find('[data-test=product-thumbnail-original-price]')
          .should('contain', '248,75 €');

        cy.wrap($thumbnail)
          .find('[data-test=product-thumbnail-discounted-price]')
          .should('contain', '174,12 €');
      });
  });
});
