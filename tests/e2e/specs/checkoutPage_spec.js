describe('CheckoutPage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  function shouldAllowToPlaceOrders() {
    cy.get('[data-test=summary-shipping-address]')
      .then(($address) => {
        cy.wrap($address)
          .find('[data-test=address-name]')
          .should('contain', 'Charlie Bucket');
        cy.wrap($address)
          .find('[data-test=address-street]')
          .should('contain', 'Nowhere str.');
        cy.wrap($address)
          .find('[data-test=address-street-info]')
          .should('contain', 'Crocked house');
        cy.wrap($address)
          .find('[data-test=address-city]')
          .should('contain', '54321, Little Town (DE)');
        cy.wrap($address)
          .find('[data-test=address-phone]')
          .should('contain', 'None');
        cy.wrap($address)
          .find('[data-test=address-email]')
          .should('contain', 'charlie.bucket@commercetools.com');
      });

    cy.get('[data-test=summary-billing-address]')
      .then(($address) => {
        cy.wrap($address)
          .find('[data-test=address-name]')
          .should('contain', 'Willy Wonka');
        cy.wrap($address)
          .find('[data-test=address-street]')
          .should('contain', 'Cherry Street');
        cy.wrap($address)
          .find('[data-test=address-street-info]')
          .should('contain', 'Chocolate Factory');
        cy.wrap($address)
          .find('[data-test=address-city]')
          .should('contain', '12345, Little Town (DE)');
        cy.wrap($address)
          .find('[data-test=address-phone]')
          .should('contain', '555-44-22-11');
        cy.wrap($address)
          .find('[data-test=address-email]')
          .should('contain', 'willy.wonka@commercetools.com');
      });

    cy.get('[data-test=summary-shipping-method]')
      .should('contain', 'Express EU');

    cy.get('[data-test=cart-subtotal-price]')
      .contains(/^\s*815,90\s€\s*$/);
    cy.get('[data-test=cart-shipping-price]')
      .contains(/^\s*10,00\s€\s*$/);
    cy.get('[data-test=cart-taxes-amount]')
      .contains(/^\s*131,87\s€\s*$/);
    cy.get('[data-test=cart-total-price]')
      .contains(/^\s*825,90\s€\s*$/);

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
          .should('contain', '3');

        cy.wrap($lineItem)
          .find('[data-test=price-old-value]')
          .contains(/^\s*199,00\s€\s*$/);

        cy.wrap($lineItem)
          .find('[data-test=price-new-value]')
          .contains(/^\s*139,30\s€\s*$/);

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-total-price]')
          .contains(/^\s*417,90\s€\s*$/);
      });
  }

  it('allows to place an order', () => {
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
    cy.get('[data-test=checkout-form-same-as-shipping]').should('exist');

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
    cy.get('[data-test=summary-billing-address]')
      .then(($address) => {
        cy.wrap($address)
          .find('[data-test=address-name]')
          .should('contain', 'Charlie Bucket');
        cy.wrap($address)
          .find('[data-test=address-street]')
          .should('contain', 'Nowhere str.');
        cy.wrap($address)
          .find('[data-test=address-street-info]')
          .should('contain', 'Crocked house');
        cy.wrap($address)
          .find('[data-test=address-city]')
          .should('contain', '54321, Little Town (DE)');
        cy.wrap($address)
          .find('[data-test=address-phone]')
          .should('contain', 'None');
        cy.wrap($address)
          .find('[data-test=address-email]')
          .should('contain', 'charlie.bucket@commercetools.com');
      });

    cy.get('[data-test=summary-billing-address-edit]').click();
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
      .should('have.length', 2);

    cy.get('[data-test=continue-checkout-button]').click();

    cy.get('[data-test=checkout-form-payment-methods]')
      .find('label')
      .should('have.length', 2);

    cy.get('[data-test=continue-checkout-button]').click();
    shouldShowCorrectCartLike();

    cy.get('[data-test=checkout-form-submit]').click();

    cy.get('[data-test=checkout-form-success]').should('exist');
    shouldShowCorrectCartLike();
  });
});
