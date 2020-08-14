describe('OrderDetailPage', () => {
  const cartDiscount = {
    value: {
      relative: { permyriad: 5000 },
    },
    cartPredicate: '1=1',
    sortOrder: Math.random().toString(),
    name: { locale: 'en', value: '50% discount' },
    requiresDiscountCode: true,
    target: {
      lineItems: { predicate: '1=1' },
    },
  };

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
      sku: 'M0E20000000ELAJ',
    },
    {
      sku: 'M0E20000000DX1Y',
      quantity: 2,
    },
    ],
    discountCodes: ['SUNRISE_CI'],
  };

  before(() => {
    cy.addDiscountCode(cartDiscount, 'SUNRISE_CI');
    cy.createCustomer(customerDraft);
    cy.login(customerDraft);
    cy.createOrder(cartDraft, orderDraft);
  });

  it('shows order details', () => {
    cy.get('[data-test=my-orders-button]').click();
    cy.reload();
    cy.get('[data-test=view-order-btn]').click();
    // this test can never pass because you cannot add order number
    // to me route: https://docs.commercetools.com/http-api-projects-me-orders#myorderfromcartdraft
    // cy.url().should('include', '/user/orders/12345');
    // cy.get('[data-test=details-order-number]')
    //   .contains('12345');
    cy.get('[data-test=details-order-date]')
      .contains(/^\s*\d{1,2}\.*\s*[A-Za-zäÄöÖüÜß].+\s*\d{4}\s*$/);
    cy.get('[data-test=order-subtotal-price]')
      .should((e) => {
        expect(e.text()).to.match(/^\s*149,50\s€\s*$/);
      });
    cy.get('[data-test=cart-shipping-price]')
      .contains(/^\s*10,00\s€\s*$/);
    // no tax on order detail
    // cy.get('[data-test=cart-taxes-amount]')
    //   .should((e) => {
    //     expect(e.text()).to.match(/^\s*25,47\s€\s*$/);
    //   });
    cy.get('[data-test=cart-total-price]')
      .should((e) => {
        expect(e.text()).to.match(/^\s*159,50\s€\s*$/);
      });
    cy.get('[data-test=cart-line-item]')
      .should('have.length', 2)
      .eq(1)
      .then(($item) => {
        cy.wrap($item)
          .find('[data-test=price-old-value]')
          .eq(1)
          .should((e) => {
            expect(e.text()).to.match(/^\s*275,00\s€\s*$/);
          });
        cy.wrap($item)
          .find('[data-test=price-new-value]')
          .eq(0)
          .should((e) => {
            expect(e.text()).to.match(/^\s*137,50\s€\s*$/);
          });
        cy.wrap($item)
          .find('[data-test=price-new-value]')
          .eq(1)
          .should((e) => {
            expect(e.text()).to.match(/^\s*137,50\s€\s*$/);
          });
      });
    cy.get('[data-test=discount-code-name]')
      .contains('SUNRISE_CI');
    cy.get('[data-test=remove-discount-button]')
      .should('not.exist');
  });
});
