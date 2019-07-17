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
          .find('[data-test=price-old-value]')
          .contains(/^\s*248,75\s€\s*$/);

        cy.wrap($lineItem)
          .find('[data-test=price-new-value]')
          .contains(/^\s*174,12\s€\s*$/);

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-total-price]')
          .contains(/^\s*522,36\s€\s*$/);
      });
  });

  it('manages line items in cart', () => {
    cy.addLineItem('/product/lemare-booties-0778-grey/M0E20000000E0WX', 3);
    cy.visit('/cart');

    cy.get('[data-test=cart-line-item]')
      .should('have.length', 1)
      .then(($lineItem) => {
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity]')
          .should('have.value', '3')
          .clear()
          .type('5');
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-total-price]')
          .contains(/^\s*870,60\s€\s*$/);

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity-inc]')
          .click()
          .click();
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity]')
          .should('have.value', '7');
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-total-price]')
          .contains(/^\s*1.218,84\s€\s*$/);

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity-dec]')
          .click();
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity]')
          .should('have.value', '6');
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-total-price]')
          .contains(/^\s*1.044,72\s€\s*$/);

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-delete]').click();
      });
    cy.get('[data-test=cart-line-item]').should('have.length', 0);
  });

  const cartDiscount = {
    value: {
      relative: { permyriad: 5000 },
    },
    cartPredicate: '1=1',
    sortOrder: Math.random().toString(),
    name: { locale: 'en', value: '50% discount' },
    requiresDiscountCode: true,
    target: {
      lineItems: { predicate: '1=1' },
    },
  };

  it('applies and deletes discount codes', () => {
    cy.addDiscountCode(cartDiscount, 'SUNRISE_CI');
    cy.addLineItem('/product/lemare-booties-0778-brown/M0E20000000E0XM', 1);
    cy.visit('/cart');

    cy.get('[data-test=cart-line-item-total-price]')
      .contains(/^\s*248,75\s€\s*$/);

    cy.get('[data-test=discount-code-input]')
      .type('SUNRISE_CI');
    cy.get('[data-test=apply-discount-code-button]')
      .click();
    cy.get('[data-test=cart-total-price]')
      .contains(/^\s*124,37\s€\s*$/);

    cy.get('[data-test=discount-code-name]')
      .contains('SUNRISE_CI');
    cy.get('[data-test=remove-discount-button]')
      .click();

    cy.get('[data-test=cart-line-item-total-price]')
      .contains(/^\s*124,37\s€\s*$/);
  });
});
