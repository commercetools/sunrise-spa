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

  beforeEach(() => {
    cy.visit('/');
    cy.login(customer);
  });

  it('shows my orders', () => {
    cy.createOrder(cartDraft1, orderDraft1);
    cy.createOrder(cartDraft2, orderDraft2);
    cy.get('[data-test=my-orders-button]', { timeout: 20000 }).click();
    cy.get('[data-test=order-list]')
      .should('have.length', 2)
      .eq(0)
      .then(($order) => {
        cy.wrap($order)
          .find('[data-test=total-price]')
          .contains(/^\s*368,75\s€\s*$/);
        cy.wrap($order)
          .find('[data-test=order-date]')
          .contains(/^\s*\d{1,2}\.*\s*[A-Za-zäÄöÖüÜß].+\s*\d{4}\s*$/);
        cy.wrap($order)
          .find('[data-test=order-number]')
          .contains('1234');
        cy.changeLanguage('Deutsch');
        cy.wrap($order)
          .find('[data-test=shipment-state]')
          .contains('Versandt');
        cy.wrap($order)
          .find('[data-test=payment-state]')
          .contains('Anstehend');
      });
  });

  it('displays an empty order list message when no orders have been placed', () => {
    cy.get('[data-test=my-orders-button]').click();
    cy.get('[data-test=order-list]')
      .should('have.length', 0);
    cy.get('[data-test=empty-order-list]')
      .contains('You have not placed any orders yet!');
  });
});
