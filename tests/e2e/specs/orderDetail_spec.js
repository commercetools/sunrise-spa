describe('OrderDetailPage', () => {
  const customerDraft = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'charlie.bucket+ci@commercetools.com',
    password: 'p@ssword',
  };

  const orderDraft = {
    orderNumber: '12345',
    paymentState: 'Pending',
    shipmentState: 'Shipped',
  };

  const cartDraft = {
    currency: 'EUR',
    country: 'DE',
    customerEmail: 'charlie.bucket+ci@commercetools.com',
    shippingAddress: {
      title: 'Mr.',
      firstName: 'Charlie',
      lastName: 'Bucket',
      streetName: 'Sonnenallee',
      streetNumber: '223',
      additionalStreetInfo: '3. OG',
      postalCode: '12059',
      city: 'Berlin',
      country: 'DE',
      phone: '123456789',
      email: 'charlie.bucket+ci@commercetools.com',
    },
    billingAddress: {
      title: 'Mr.',
      firstName: 'Charlie',
      lastName: 'Bucket',
      streetName: 'Sonnenallee',
      streetNumber: '223',
      additionalStreetInfo: '3. OG',
      postalCode: '12059',
      city: 'Berlin',
      country: 'DE',
      phone: '123456789',
      email: 'charlie.bucket+ci@commercetools.com',
    },
    shippingMethod: {
      key: 'express-EU',
    },
    lineItems: [{
      sku: 'M0E20000000EFWN',
    },
    {
      sku: 'M0E20000000E0WX',
      quantity: 2,
    },
    ],
  };

  before(() => {
    cy.login(customerDraft);
    cy.createOrder(cartDraft, orderDraft);
  });

  it('shows order details', () => {
    cy.get('[data-test=my-orders-button]').click();
    cy.reload();
    cy.get('[data-test=view-order-btn]').click();
    cy.url().should('include', '/user/orders/12345');
    cy.get('[data-test=details-order-number]')
      .contains('12345');
    cy.get('[data-test=details-order-date]')
      .contains(/^\s*\d{1,2}\.*\s*[A-Za-zäÄöÖüÜß]+\s*\d{4}\s*$/);
    cy.get('[data-test=cart-subtotal-price]')
      .contains(/^\s*367,60\s€\s*$/);
    cy.get('[data-test=cart-shipping-price]')
      .contains(/^\s*10,00\s€\s*$/);
    cy.get('[data-test=cart-taxes-amount]')
      .contains(/^\s*60,29\s€\s*$/);
    cy.get('[data-test=cart-total-price]')
      .contains(/^\s*377,60\s€\s*$/);
    cy.get('[data-test=cart-line-item]')
      .should('have.length', 2)
      .eq(1)
      .then(($item) => {
        cy.wrap($item)
          .find('[data-test=price-old-value]')
          .contains(/^\s*199,00\s€\s*$/);
        cy.wrap($item)
          .find('[data-test=price-new-value]')
          .contains(/^\s*139,30\s€\s*$/);
      });
  });
});
