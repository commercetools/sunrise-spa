describe('Product overview page', () => {
  it('Changes sorting settings', () => {
    cy.visit('/products/men');
    cy.get('span[data-test=sort-selector]', { timeout: Cypress.config('graphqlTimeout') })
      .click()
      .parent()
      .contains('Newest')
      .click();
    cy.url().should('include', '/products/men?sort=newest');
    cy.get('[data-test=spinner]')
      .should('exist');
    cy.get('[data-test=spinner]')
      .should('not.exist');
    cy.get('[data-test=product-list]')
      .first()
      .find('[data-test=product-thumbnail-name]')
      .contains('Shirt ”David” MU light blue');
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .contains('Lace up shoes Tods dark blue');

    cy.get('span[data-test=sort-selector]')
      .click()
      .parent()
      .contains('Oldest')
      .click();
    cy.get('[data-test=spinner]')
      .should('exist');
    cy.get('[data-test=spinner]')
      .should('not.exist');
    cy.url().should('include', '/products/men?sort=oldest');
    cy.get('[data-test=product-list]')
      .first()
      .find('[data-test=product-thumbnail-name]')
      .contains('Lace up shoes Tods dark blue');
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .contains('Shirt ”David” MU light blue');
  });

  it('Applies sorting settings from URL', () => {
    cy.visit('/products/men?sort=newest');
    cy.get('[data-test=spinner]')
      .should('exist');
    cy.get('[data-test=spinner]')
      .should('not.exist');
    cy.get('[data-test=product-list]')
      .first()
      .find('[data-test=product-thumbnail-name]')
      .contains('Shirt ”David” MU light blue');
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .contains('Lace up shoes Tods dark blue');
  });

  it('Displays a message when an error occurs', () => {
    cy.visit('/products/accessories');
    cy.get('[data-test=empty-results]')
      .contains('No Results Found');

    cy.get('span[data-test=sort-selector]')
      .should('not.exist');

    cy.visit('/products/unvalidCategory');
    cy.get('[data-test=category-not-found]')
      .contains('Category Not Found');
  });
});
