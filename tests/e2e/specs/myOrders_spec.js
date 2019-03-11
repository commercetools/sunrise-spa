describe('my orders', () => {
  const customer = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'charlie.bucket+ci@commercetools.com',
    password: 'p@ssword',
  };

  const orderNumber1 = '1234';
  const orderNumber2 = '4321';

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
    cy.createMyOrder(cartDraft1, orderNumber1);
    cy.createMyOrder(cartDraft2, orderNumber2);
    cy.changeOrderStatus(orderNumber1);
    cy.get('[data-test=my-orders-button]').click();
    cy.reload();
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
        cy.get('[data-test=location-selector-open-button]').click();
        cy.get('span[data-test=location-selector-dropdown]')
          .click()
          .parent()
          .contains('Deutsch')
          .click();
        cy.wrap($order)
          .find('[data-test=shipment-state]')
          .contains('Versandt');
        cy.wrap($order)
          .find('[data-test=payment-state]')
          .contains('Anstehend');
      });
  });
});
