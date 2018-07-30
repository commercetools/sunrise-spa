describe('Breadcrumb', () => {
  before(() => {
    cy.visit('/#/products/women-shoes-ankle-boots/');
  });

  it('displays and links to each category\'s ancestor', () => {
    cy.get('[data-test=breadcrumb-home-link]', { timeout: 10000 })
      .should('contain', 'Home')
      .should('have.attr', 'href', '#/')
      .should('not.have.class', 'active');

    cy.get('[data-test=breadcrumb-ancestor-link]')
      .eq(0)
      .should('contain', 'Women')
      .should('have.attr', 'href', '#/products/women')
      .should('not.have.class', 'active');

    cy.get('[data-test=breadcrumb-ancestor-link]')
      .eq(1)
      .should('contain', 'Shoes')
      .should('have.attr', 'href', '#/products/women-shoes')
      .should('not.have.class', 'active');

    cy.get('[data-test=breadcrumb-ancestor-link]')
      .eq(2)
      .should('not.exist');

    cy.get('[data-test=breadcrumb-category-link]')
      .contains('Ankle boots')
      .should('have.attr', 'href', '#/products/women-shoes-ankle-boots')
      .should('have.class', 'active');
  });
});
