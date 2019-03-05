describe('my orders', () => {
  const customer = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'charlie.bucket+ci@commercetools.com',
    password: 'p@ssword',
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
    cy.createMyOrder(cartDraft1);
    cy.createMyOrder(cartDraft2);
    cy.get('[data-test=my-orders-button]').click();
    cy.reload();
    cy.url().should('include', '/user/orders');
    cy.get('[data-test=order-date]')
      .should('exist');
    cy.get('[data-test=total-price]')
      .contains('368,75');
    cy.get('[data-test=total-price]')
      .contains('372,50');
  });
});
