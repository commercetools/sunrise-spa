describe('Product overview page', () => {
  it('Changes sorting settings', () => {
    cy.visit('/products/men');
    cy.get('span[data-test=sort-selector]')
      .click()
      .parent()
      .contains('Newest')
      .click();
    cy.url().should('include', '/products/men?sort=newest');
    cy.get('[data-test=spinner]')
      .should('exist');
    cy.get('[data-test=spinner]')
      .should('not.exist');
    cy.get('[data-test=product-list]', { timeout: 20000 })
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
    cy.get('[data-test=product-list]', { timeout: 20000 })
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
    cy.get('[data-test=product-list]', { timeout: 20000 })
      .first()
      .find('[data-test=product-thumbnail-name]')
      .contains('Shirt ”David” MU light blue');
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .contains('Lace up shoes Tods dark blue');
  });

  it('Displays a message when the product list is empty', () => {
    cy.visit('/products/accessories');
    cy.get('span[data-test=sort-selector]')
      .should('not.exist');
    cy.get('[data-test=empty-results]')
      .contains('No Results Found.');
  });

  it('Paginates back and forth through product list', () => {
    cy.visit('/products/women-clothing-dresses');
    cy.get('[data-test=product-list]', { timeout: 20000 });
    cy.get('[data-test=pagination]')
      .find('[data-test=total-pages]')
      .contains('Page 1 of 2')
      .parent()
      .find('[data-test=previousPageLink]')
      .should('be.disabled');

    cy.get('[data-test=pagination]')
      .find('[data-test=nextPageLink]')
      .click();

    cy.url().should('include', '/products/women-clothing-dresses/2');
    cy.get('[data-test=pagination]')
      .find('[data-test=total-pages]')
      .contains('Page 2 of 2')
      .parent()
      .find('[data-test=nextPageLink]')
      .should('be.disabled');

    cy.get('[data-test=pagination]')
      .find('[data-test=previousPageLink]')
      .click();
    cy.url().should('include', '/products/women-clothing-dresses/1');
    cy.get('[data-test=pagination]')
      .find('[data-test=total-pages]')
      .contains('Page 1 of 2');
  });
});
