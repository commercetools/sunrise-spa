describe('Product overview page', () => {
  before(() => {
    cy.visit('/products/men');
  });
  it('Changes sorting settings', () => {
    cy.get('[data-test=sorting-select]')
      .select('newest');
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

    cy.get('[data-test=sorting-select]')
      .select('oldest');
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
    cy.get('[data-test=product-list]', { timeout: 20000 })
      .first()
      .find('[data-test=product-thumbnail-name]')
      .contains('Shirt ”David” MU light blue');
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .contains('Lace up shoes Tods dark blue');
  });
});
