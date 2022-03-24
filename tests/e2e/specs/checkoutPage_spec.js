describe('CheckoutPage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('allows to place an order', () => {
    cy.addLineItem(
      '/product/hoganrebel-r261-sneaker-6708K62AZC-grey/M0E20000000DX1Y',
      2
    );
    cy.addLineItem(
      '/product/havaianas-flipflops-brasil-green/M0E20000000ELAJ',
      3
    );
    cy.visit('/cart');
    cy.get('[data-test=checkout-button]').eq(1).click();

    cy.get('[data-test=address-form-firstName]').type(
      'Charlie'
    );
    cy.get('[data-test=address-form-lastName]').type(
      'Bucket'
    );
    cy.get('[data-test=address-form-streetName]').type(
      'Nowhere str.'
    );
    cy.get(
      '[data-test=address-form-additionalStreetInfo]'
    ).type('Crocked house');
    cy.get('[data-test=address-form-postalCode]').type(
      '54321'
    );
    cy.get('[data-test=address-form-city]').type(
      'Little Town'
    );
    cy.get('[data-test=address-form-phone]').type('None');
    cy.get('[data-test=address-form-email]').type(
      'charlie.bucket@commercetools.com'
    );
    cy.get('[data-test=shipping-methods]')
      .find('.pay-top.sin-payment')
      .should('have.length', 2)
      .eq(1)
      .then(($method) => {
        cy.wrap($method)
          .find(
            '[data-test=checkout-form-shipping-method-name]'
          )
          .contains('Express EU');

        cy.wrap($method)
          .find(
            '[data-test=checkout-form-shipping-method-description]'
          )
          .contains(/^\s*Same day delivery\s*$/);

        cy.wrap($method)
          .find(
            '[data-test=checkout-form-shipping-method-price]'
          )
          .contains(/10,00\s€/);

        cy.wrap($method).find('input[type=radio]').check();
      });

    cy.get('[data-test=payment-methods]')
      .find('.pay-top.sin-payment')
      .should('have.length', 2);

    cy.get('[data-test=other-shipping-address]').click();
    cy.get('[data-test=alt-shipping-address]').should(
      'be.visible'
    );

    cy.get('[data-test=address-form-firstName]')
      .eq(1)
      .type('Willy');
    cy.get('[data-test=address-form-lastName]')
      .eq(1)
      .type('Wonka');
    cy.get('[data-test=address-form-streetName]')
      .eq(1)
      .type('Cherry Street');
    cy.get('[data-test=address-form-additionalStreetInfo]')
      .eq(1)
      .type('Chocolate Factory');
    cy.get('[data-test=address-form-postalCode]')
      .eq(1)
      .type('12345');
    cy.get('[data-test=address-form-city]')
      .eq(1)
      .type('Little Town');
    cy.get('[data-test=address-form-phone]')
      .eq(1)
      .type('555-44-22-11');
    cy.get('[data-test=address-form-email]')
      .eq(1)
      .type('willy.wonka@commercetools.com');

    cy.get('[data-test=place-order]').click();
    //@todo: changing to another address will break saying "Please fill in all required data"
    // cy.get('.order-complete.text-center').should('exist');
  });
});
