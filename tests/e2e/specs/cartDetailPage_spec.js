import _const from '../support/const';

describe('CartDetailPage', () => {
  beforeEach(() => {
    cy.visit('/cart');
  });

  it('displays a message when cart is empty', () => {
    cy.get('[data-test=empty-cart]').contains(
      'Your cart is currently empty'
    );
  });

  it('displays content of cart', () => {
    cy.addLineItem(
      '/product/hoganrebel-r261-sneaker-6708K62AZC-grey/M0E20000000DX1Y',
      2
    );
    cy.addLineItem(
      '/product/havaianas-flipflops-brasil-green/M0E20000000ELAJ',
      3
    );
    cy.visit('/cart');

    cy.get('[data-test=cart-total-price]').should((e) => {
      expect(e.text()).to.include('347,00');
    });

    cy.get('[data-test=cart-taxes-amount]').should((e) => {
      expect(e.text()).to.include('55,41');
    });

    cy.get('[data-test=cart-subtotal-price]').should(
      (e) => {
        expect(e.text()).to.include('347,00');
      }
    );

    cy.get('[data-test=cart-line-item]')
      .should('have.length', 2)
      .eq(0)
      .then(($lineItem) => {
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-link]')
          .should(
            'have.attr',
            'href',
            '/product/hoganrebel-r261-sneaker-6708K62AZC-grey/M0E20000000DX1Y'
          )
          .should('contain', _const.one.NAME);

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-sku]')
          .should('contain', _const.one.sku);

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity]')
          .should('have.value', '2');

        cy.wrap($lineItem)
          .find('[data-test=line-total]')
          .should((e) => {
            expect(e.text()).to.include('275,00');
          });

        cy.wrap($lineItem)
          .find('[data-test=item-price]')
          .should((e) => {
            expect(e.text()).to.include('275,00');
          });
      });
  });

  it('manages line items in cart', () => {
    cy.addLineItem(
      '/product/havaianas-flipflops-brasil-green/M0E20000000ELAJ',
      3
    );
    cy.visit('/cart');

    cy.get('[data-test=cart-line-item]', {
      timeout: Cypress.config('graphqlTimeout'),
    })
      .should('have.length', 1)
      .then(($lineItem) => {
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity]')
          .should('have.value', '3')
          .clear()
          .type('5');
        cy.wrap($lineItem)
          .find('[data-test=line-total]')
          .contains(/^\s*120,00\s€\s*$/, {
            timeout: Cypress.config('graphqlTimeout'),
          });

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity]')
          .clear()
          .type(7);
        cy.wrap($lineItem)
          .find('[data-test=line-total]')
          .contains(/^\s*168,00\s€\s*$/, {
            timeout: Cypress.config('graphqlTimeout'),
          });

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity]')
          .clear()
          .type(6);
        cy.wrap($lineItem)
          .find('[data-test=line-total]')
          .contains(/^\s*144,00\s€\s*$/, {
            timeout: Cypress.config('graphqlTimeout'),
          });

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-delete]')
          .click();
      });
    cy.get('[data-test=cart-line-item]').should(
      'have.length',
      0,
      { timeout: Cypress.config('graphqlTimeout') }
    );
  });

  it('removes line item when quantity is decreased to less than 1', () => {
    cy.addLineItem(
      '/product/havaianas-flipflops-brasil-green/M0E20000000ELAJ',
      1
    );
    cy.visit('/cart');

    cy.get('[data-test=cart-line-item]').should(
      'have.length',
      1
    );

    cy.get('[data-test=cart-line-item-delete]')
      .eq(1)
      .click();
    cy.get('[data-test=cart-line-item]').should(
      'have.length',
      0
    );
  });

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

  it('applies and deletes discount codes', () => {
    cy.addDiscountCode(cartDiscount, 'SUNRISE_CI');
    cy.addLineItem(
      '/product/hoganrebel-r261-sneaker-6708K62AZC-grey/M0E20000000DX1Y',
      1
    );
    cy.visit('/cart');
    cy.get('[data-test=line-total]').contains(
      /^\s*137,50\s€\s*$/,
      { timeout: Cypress.config('graphqlTimeout') }
    );

    cy.get('[data-test=discount-code-input]').type(
      'SUNRISE_CI'
    );
    cy.get(
      '[data-test=apply-discount-code-button]'
    ).click();
    cy.get('[data-test=cart-total-price]').contains(
      /^\s*68,75\s€\s*$/,
      { timeout: Cypress.config('graphqlTimeout') }
    );
    cy.get('[data-test=discount-code-name]').contains(
      'SUNRISE_CI'
    );
    cy.get('[data-test=remove-discount-button]').click();

    cy.get('[data-test=line-total]').contains(
      /^\s*137,50\s€\s*$/,
      { timeout: Cypress.config('graphqlTimeout') }
    );
  });
});
