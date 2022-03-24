describe('Breadcrumb', () => {
  before(() => {
    cy.visit('/products/women-shoes-ankle-boots');
  });

  xit('links to each category of the breadcrumb', () => {
    cy.get('[data-test=breadcrumb-home-link]', {
      timeout: Cypress.config('graphqlTimeout'),
    })
      .should('contain', 'Home')
      .should('have.attr', 'href', '/')
      .should('not.have.class', 'active');

    cy.get('[data-test=breadcrumb-ancestor-link]')
      .eq(0)
      .should('contain', 'Women')
      .should('have.attr', 'href', '/products/women');

    cy.get('[data-test=breadcrumb-ancestor-link]')
      .eq(1)
      .should('contain', 'Shoes')
      .should('have.attr', 'href', '/products/women-shoes');

    cy.get('[data-test=breadcrumb-ancestor-link]')
      .eq(2)
      .should('not.exist');
  });
});
