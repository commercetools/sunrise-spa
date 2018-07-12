describe('Categories menu', () => {
  before(() => {
    cy.visit('/');
  });

  it('links to any level category', () => {
    cy.get('[data-test=categories-1st-level]')
      .contains('Women', { timeout: 10000 })
      .should('have.attr', 'href', '#/products/women')
      .parent()
      .trigger('mouseover');

    cy.get('[data-test=categories-2nd-level]')
      .contains('Shoes')
      .should('have.attr', 'href', '#/products/women-shoes');

    cy.get('[data-test=categories-3rd-level]')
      .contains('Ankle boots')
      .should('have.attr', 'href', '#/products/women-shoes-ankle-boots');
  });
});
