describe('Cart', () => {
  before(() => {
    cy.visit('/product/lemare-booties-0778-grey/M0E20000000E0WX');
  });

  it('adds a product to the cart', () => {
    cy.get('[data-test=mini-cart-open-button]', { timeout: 20000 })
      .contains(/^\s*Cart\s*0\s*$/)
      .trigger('mouseenter');

    cy.get('[data-test=mini-cart-content]').should('not.exist');

    cy.get('span[data-test=add-to-cart-form-quantity-dropdown]')
      .click()
      .parent()
      .contains('3')
      .click();

    cy.get('[data-test=add-to-cart-form-button]').click();

    cy.get('[data-test=mini-cart-open-button]')
      .contains(/^\s*Cart\s*3\s*$/)
      .trigger('mouseenter');

    cy.get('[data-test=mini-cart-content]').should('exist');
  });
});
