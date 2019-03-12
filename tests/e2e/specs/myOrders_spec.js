describe('my orders', () => {
  const customer = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'charlie.bucket+ci@commercetools.com',
    password: 'p@ssword',
  };

  const orderDraft1 = {
    orderNumber: '1234',
    paymentState: 'Pending',
    shipmentState: 'Shipped',
  };

  const orderDraft2 = {
    orderNumber: '4321',
  };

  const cartDraft1 = {
    customerEmail: 'charlie.bucket+ci@commercetools.com',
    currency: 'EUR',
    lineItems: {
      sku: 'M0E20000000DPZ0',
    },
    shippingAddress: {
      country: 'DE',
    },
  };

  const cartDraft2 = {
    customerEmail: 'charlie.bucket+ci@commercetools.com',
    currency: 'EUR',
    lineItems: {
      sku: 'M0E20000000DLPH',
    },
    shippingAddress: {
      country: 'DE',
    },
  };

  before(() => {
    cy.login(customer);
  });

  it('shows my orders', () => {
    cy.createMyOrder(cartDraft1, orderDraft1);
    cy.createMyOrder(cartDraft2, orderDraft2);
    cy.get('[data-test=my-orders-button]').click();
    cy.reload();
    cy.get('[data-test=location-selector-open-button]').click();
    cy.get('span[data-test=location-selector-dropdown]')
      .click()
      .parent()
      .contains('Deutsch')
      .click();
    cy.url().should('include', '/user/orders');
    cy.get('[data-test=order-list]')
      .should('have.length', 2)
      .eq(0)
      .then(($order) => {
        cy.wrap($order)
          .find('[data-test=total-price]')
          .contains(/^\s*368,75\s€\s*$/);
        cy.wrap($order)
          .find('[data-test=order-date]')
          .contains(/^\s*\d{1,2}\.*\s*[A-Za-zäÄöÖüÜß]+\s*\d{4}\s*$/);
        cy.wrap($order)
          .find('[data-test=order-number]')
          .contains('1234');
        cy.wrap($order)
          .find('[data-test=shipment-state]')
          .contains('Versandt');
        cy.wrap($order)
          .find('[data-test=payment-state]')
          .contains('Anstehend');
      });
  });
});
