describe('Product list', () => {
  before(() => {
    cy.visit('/#/products/women-shoes-ankle-boots/');
  });

  it('displays products information', () => {
    cy.get('[data-test=product-thumbnail-item]', { timeout: 10000 })
      .eq(1)
      .find('img').should('have.attr', 'src')
      .should('include', '.jpg');

    cy.get('[data-test=product-thumbnail-item]')
      .eq(1)
      .find('[data-test=product-thumbnail-name]')
      .contains('Booties Lemare grey')
      .parentsUntil('[data-test=product-thumbnail-item]')
      .parent()
      .find('[data-test=product-thumbnail-original-price]')
      .contains('248,75')
      .contains('€')
      .parentsUntil('[data-test=product-thumbnail-price]')
      .parent()
      .find('[data-test=product-thumbnail-discounted-price]')
      .contains('174,12')
      .contains('€');
  });
});
