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
      sku: 'M0E20000000ELAJ',
    },
    shippingAddress: {
      country: 'DE',
    },
  };

  const cartDraft2 = {
    customerEmail: 'charlie.bucket+ci@commercetools.com',
    currency: 'EUR',
    lineItems: {
      sku: 'M0E20000000DX1Y',
    },
    shippingAddress: {
      country: 'DE',
    },
  };

  beforeEach(() => {
    cy.visit('/');
    cy.createCustomer(customer);
    cy.login(customer);
  });

  it('shows my orders', () => {
    cy.createOrder(cartDraft1, orderDraft1);
    cy.createOrder(cartDraft2, orderDraft2);
    cy.get('[data-test=my-orders-button]').click();
    cy.get('[data-test=order-list]')
      .should('have.length', 2)
      .eq(1)
      .then(($order) => {
        cy.wrap($order)
          .find('[data-test=total-price]')
          .should((e) => {
            expect(e.text()).to.match(/^\s*30,00\s€\s*$/);
          });
        cy.wrap($order)
          .find('[data-test=order-date]')
          .contains(
            /^\s*\d{1,2}\.*\s*[A-Za-zäÄöÖüÜß].+\s*\d{4}\s*$/
          );
        // pointless to check for order number, my route does not allow
        //   order number
        // cy.wrap($order)
        //   .find('[data-test=order-number]')
        //   .contains('1234');
        cy.changeLanguage('German');
        cy.wrap($order)
          .find('[data-test=shipment-state]')
          .contains('Versandt');
        // cy.wrap($order)
        //   .find('[data-test=payment-state]')
        //   .contains('Anstehend');
      });
  });

  it('shows pages', () => {
    cy.createOrder(cartDraft1, {
      orderNumber: String(9001),
    });
    cy.get('[data-test=my-orders-button]').click();
    cy.get('[data-test=pagination]').should('not.exist');
    cy.createOrder(cartDraft1, {
      orderNumber: String(9002),
    });
    cy.createOrder(cartDraft1, {
      orderNumber: String(9003),
    });
    cy.visit('/DE/en/user/account');
    cy.get('[data-test=my-orders-button]').click();
    cy.get('[data-test=pagination]').should('exist');
    cy.get('[data-test=order-list]').should(
      'have.length',
      2
    );
    cy.get('[data-test=pagination]').contains('12Next');
    cy.get('[data-test=next-page-link').click();
    cy.get('[data-test=order-list]').should(
      'have.length',
      1
    );
    cy.visit('/DE/en/user/orders/1');
    cy.get('[data-test=pagination]').should('exist');
    cy.get('[data-test=order-list]').should(
      'have.length',
      2
    );
    cy.get('[data-test=pagination]').contains('12Next');
  });

  it('displays an empty order list message when no orders have been placed', () => {
    cy.get('[data-test=my-orders-button]', {
      timeout: Cypress.config('graphqlTimeout'),
    }).click();
    cy.get('[data-test=order-list]').should(
      'have.length',
      0,
      { timeout: Cypress.config('graphqlTimeout') }
    );
    cy.get('[data-test=empty-order-list]').contains(
      'You have not placed any orders yet!'
    );
  });
});
