// https://docs.cypress.io/api/introduction/api.html

describe('Menu navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('links to 1st level categories', () => {
    cy.get('#nav-categories-menu > li')
      .contains('Women')
      .should('have.attr', 'href', '#/products/women');
  });

  it('links to 2nd level categories', () => {
    cy.get('#nav-categories-menu > li')
      .contains('Women')
      .parent()
      .trigger('mouseover')
      .contains('Shoes')
      .should('have.attr', 'href', '#/products/women-shoes');
  });

  it('links to 3rd level categories', () => {
    cy.get('#nav-categories-menu > li')
      .contains('Women')
      .parent()
      .trigger('mouseover')
      .contains('Ankle boots')
      .should('have.attr', 'href', '#/products/women-shoes-ankle-boots');
  });
});
