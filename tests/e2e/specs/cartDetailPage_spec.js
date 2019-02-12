describe('CartDetailPage', () => {
  beforeEach(() => {
    localStorage.removeItem('auth');
    cy.visit('/cart');
  });

  it('displays content of cart', () => {
    cy.get('[data-test=cart-total-items]', { timeout: 20000 })
      .contains(/^\s*0 items in total\s*$/);

    cy.addLineItem('/product/lemare-booties-0778-brown/M0E20000000E0XM', 2);
    cy.addLineItem('/product/lemare-booties-0778-grey/M0E20000000E0WX', 3);
    cy.visit('/cart');
    cy.get('[data-test=cart-total-items]')
      .contains(/^\s*5 items in total\s*$/);

    cy.get('[data-test=cart-total-price]')
      .contains(/^\s*1.019,86\s€\s*$/);

    cy.get('[data-test=cart-subtotal-price]')
      .contains(/^\s*1.019,86\s€\s*$/);

    cy.get('[data-test=cart-line-item]')
      .should('have.length', 2)
      .eq(1)
      .then(($lineItem) => {
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-link]')
          .should('have.attr', 'href', '/product/lemare-booties-0778-grey/M0E20000000E0WX')
          .should('contain', 'Booties Lemare grey');

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-sku]')
          .should('contain', 'M0E20000000E0WX');

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity]')
          .should('have.value', '3');

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-discounted-price]')
          .contains(/^\s*248,75\s€\s*$/);

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-price]')
          .contains(/^\s*174,12\s€\s*$/);

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-total-price]')
          .contains(/^\s*522,36\s€\s*$/);
      });
  });

  it('manages line items in cart', () => {
    cy.addLineItem('/product/lemare-booties-0778-grey/M0E20000000E0WX', 3);
    cy.visit('/cart');

    cy.get('[data-test=cart-line-item-quantity]')
      .should('have.value', '3')
      .clear()
      .type('5');
    cy.get('[data-test=cart-line-item-total-price]')
      .contains(/^\s*870,60\s€\s*$/);

    cy.get('[data-test=cart-line-item-quantity]')
      .parent()
      .contains('+')
      .click()
      .click();
    cy.get('[data-test=cart-line-item-quantity]')
      .should('have.value', '7');
    cy.get('[data-test=cart-line-item-total-price]')
      .contains(/^\s*1.218,84\s€\s*$/);

    cy.get('[data-test=cart-line-item-delete]').click();
    cy.get('[data-test=cart-line-item]').should('have.length', 0);
  });
});
