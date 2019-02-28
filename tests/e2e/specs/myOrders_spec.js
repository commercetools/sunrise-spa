describe('my orders', () => {
  const customer = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'charlie.bucket+ci@commercetools.com',
    password: 'p@ssword',
  };

  const cartDraft = {
    customerEmail: 'charlie.bucket+ci@commercetools.com',
    currency: 'EUR',
    lineItems: {
      sku: 'M0E20000000DPZ0',
    },
    shippingAddress: {
      country: 'DE',
    },
  };

  before(() => {
    cy.login(customer);
  });

  it('shows my orders', () => {
    cy.createMyOrder(cartDraft);
    cy.get('[data-test=my-orders-button]').click();
    cy.url().should('include', '/user/orders');
    cy.get('[data-test=total-price]')
      .should('exist');
    cy.get('[data-test=total-price]')
      .should('exist');
  });
});
