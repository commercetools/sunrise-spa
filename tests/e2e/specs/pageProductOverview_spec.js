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
      .contains('Sneaker – Lotto “Tokyo“');
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .contains('Polo Moncler red');

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
      .contains('Polo Ralph Lauren green');
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .contains('Hoodie Moncler dark blue');
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
      .contains('Sneaker – Lotto “Tokyo“');
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .contains('Polo Moncler red');
  });

  it('Displays a message when an error occurs', () => {
    cy.visit('/products/accessories-men-sunglasses');
    cy.get('[data-test=empty-results]')
      .contains('No Results Found');

    cy.get('span[data-test=sort-selector]')
      .should('not.exist');

    cy.visit('/products/unvalidCategory');
    cy.get('[data-test=category-not-found]')
      .contains('Category Not Found');
  });

  it('Paginates back and forth through product list', () => {
    cy.visit('/products/women-clothing-dresses');
    cy.get('[data-test=product-list]', { timeout: Cypress.config('graphqlTimeout') });
    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=total-pages]')
      .contains('Page 1 of 2')
      .parent()
      .find('[data-test=previous-page-link]')
      .should('be.disabled');

    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=next-page-link]')
      .click();
    cy.url().should('include', '/products/women-clothing-dresses/2');
    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=total-pages]')
      .contains('Page 2 of 2');
    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=next-page-link]')
      .should('be.disabled');

    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=previous-page-link]')
      .click();
    cy.url().should('include', '/products/women-clothing-dresses');
    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=total-pages]')
      .contains('Page 1 of 2');
  });
});
