describe('Categories menu', () => {
  before(() => {
    cy.visit('/');
  });

  it('links to any level category', () => {
    cy.get('[data-test=category-1st-level]', { timeout: Cypress.config('graphqlTimeout') })
      .eq(1)
      .then(($menu) => {
        cy.wrap($menu)
          .find('[data-test=category-1st-level-link]')
          .contains('Women')
          .should('have.attr', 'href', '/products/women');

        cy.wrap($menu).trigger('mouseover');

        cy.wrap($menu)
          .find('[data-test=category-2nd-level-link]')
          .contains('Shoes')
          .should('have.attr', 'href', '/products/women-shoes');

        cy.wrap($menu)
          .find('[data-test=category-3rd-level-link]')
          .contains('Ankle boots')
          .should('have.attr', 'href', '/products/women-shoes-ankle-boots');
      });
  });
});
