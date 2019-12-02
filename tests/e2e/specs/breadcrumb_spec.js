describe('Breadcrumb', () => {
  before(() => {
    cy.visit('/products/women-shoes-ankle-boots/');
  });

  it('links to each category of the breadcrumb', () => {
    cy.get('[data-test=breadcrumb-home-link]', { timeout: Cypress.config('graphqlTimeout') })
      .should('contain', 'Home')
      .should('have.attr', 'href', '/')
      .should('not.have.class', 'active');

    cy.get('[data-test=breadcrumb-ancestor-link]')
      .eq(0)
      .should('contain', 'Women')
      .should('have.attr', 'href', '/products/women')
      .should('not.have.class', 'active');

    cy.get('[data-test=breadcrumb-ancestor-link]')
      .eq(1)
      .should('contain', 'Shoes')
      .should('have.attr', 'href', '/products/women-shoes')
      .should('not.have.class', 'active');

    cy.get('[data-test=breadcrumb-ancestor-link]')
      .eq(2)
      .should('not.exist');

    cy.get('[data-test=breadcrumb-category-link]')
      .should('contain', 'Ankle boots')
      .should('have.attr', 'href', '/products/women-shoes-ankle-boots')
      .should('have.class', 'active');
  });
});
