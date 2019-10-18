describe('CheckoutPage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays content of cart', () => {
    cy.addLineItem('/product/lemare-booties-0778-brown/M0E20000000E0XM', 2);
    cy.addLineItem('/product/lemare-booties-0778-grey/M0E20000000E0WX', 3);
    cy.visit('/cart');
    cy.get('[data-test=checkout-button]').click();

    cy.get('[data-test=address-form-firstName]').type('Charlie');
    cy.get('[data-test=address-form-lastName]').type('Bucket');
    cy.get('[data-test=address-form-streetName]').type('Nowhere str.');
    cy.get('[data-test=address-form-additionalStreetInfo]').type('Crocked house');
    cy.get('[data-test=address-form-postalCode]').type('54321');
    cy.get('[data-test=address-form-city]').type('Little Town');
    cy.get('[data-test=address-form-phone]').type('None');
    cy.get('[data-test=address-form-email]').type('charlie.bucket@commercetools.com');

    cy.get('[data-test=continue-checkout-button]').click();

    cy.get('[data-test=checkout-form-same-as-shipping]').uncheck();

    cy.get('[data-test=address-form-firstName]').type('Willy');
    cy.get('[data-test=address-form-lastName]').type('Wonka');
    cy.get('[data-test=address-form-streetName]').type('Cherry Street');
    cy.get('[data-test=address-form-additionalStreetInfo]').type('Chocolate Factory');
    cy.get('[data-test=address-form-postalCode]').type('12345');
    cy.get('[data-test=address-form-city]').type('Little Town');
    cy.get('[data-test=address-form-phone]').type('555-44-22-11');
    cy.get('[data-test=address-form-email]').type('willy.wonka@commercetools.com');

    cy.get('[data-test=continue-checkout-button]').click();

    cy.get('[data-test=checkout-form-shipping-methods]')
      .find('label')
      .should('have.length', 2)
      .eq(1)
      .then(($method) => {
        cy.wrap($method)
          .find('[data-test=checkout-form-shipping-method-name]')
          .contains(/^\s*Express EU\s*$/);

        cy.wrap($method)
          .find('[data-test=checkout-form-shipping-method-description]')
          .contains(/^\s*Same day delivery\s*$/);

        cy.wrap($method)
          .find('[data-test=checkout-form-shipping-method-price]')
          .contains(/\s10,00\s€\s/);

        cy.wrap($method)
          .find('input[type=radio]')
          .check();
      });

    cy.get('[data-test=continue-checkout-button]').click();

    cy.get('[data-test=checkout-form-payment-methods]')
      .find('label')
      .should('have.length', 2);

    cy.get('[data-test=continue-checkout-button]').click();


    // cy.get('[data-test=cart-total-items]')
    //   .contains(/^\s*5 items in total\s*$/);
    //
    // cy.get('[data-test=cart-total-price]')
    //   .contains(/^\s*815,90\s€\s*$/);
    //
    // cy.get('[data-test=cart-taxes-amount]')
    //   .contains(/^\s*130,27\s€\s*$/);
    //
    // cy.get('[data-test=cart-subtotal-price]')
    //   .contains(/^\s*815,90\s€\s*$/);
    //
    // cy.get('[data-test=cart-line-item]')
    //   .should('have.length', 2)
    //   .eq(1)
    //   .then(($lineItem) => {
    //     cy.wrap($lineItem)
    //       .find('[data-test=cart-line-item-link]')
    //       .should('have.attr', 'href', '/product/lemare-booties-0778-grey/M0E20000000E0WX')
    //       .should('contain', 'Booties Lemare grey');
    //
    //     cy.wrap($lineItem)
    //       .find('[data-test=cart-line-item-sku]')
    //       .should('contain', 'M0E20000000E0WX');
    //
    //     cy.wrap($lineItem)
    //       .find('[data-test=cart-line-item-quantity]')
    //       .should('have.value', '3');
    //
    //     cy.wrap($lineItem)
    //       .find('[data-test=price-old-value]')
    //       .contains(/^\s*199,00\s€\s*$/);
    //
    //     cy.wrap($lineItem)
    //       .find('[data-test=price-new-value]')
    //       .contains(/^\s*139,30\s€\s*$/);
    //
    //     cy.wrap($lineItem)
    //       .find('[data-test=cart-line-item-total-price]')
    //       .contains(/^\s*417,90\s€\s*$/);
    //   });
  });
});
