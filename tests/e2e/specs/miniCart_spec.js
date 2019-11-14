describe('MiniCart', () => {
  beforeEach(() => {
    localStorage.removeItem('auth');
    cy.visit('/');
  });

  it('links to shopping cart', () => {
    cy.get('[data-test=mini-cart-open-button]')
      .click()
      .should('have.attr', 'href', '/cart');
  });

  it('displays content of cart', () => {
    cy.get('[data-test=mini-cart-open-button]')
      .contains(/^\s*Cart\s*0\s*$/, { timeout: Cypress.config('graphqlTimeout') });

    cy.addLineItem('/product/lemare-booties-0778-brown/M0E20000000E0XM', 2);
    cy.get('[data-test=mini-cart-open-button]')
      .contains(/^\s*Cart\s*2\s*$/, { timeout: Cypress.config('graphqlTimeout') });

    cy.addLineItem('/product/lemare-booties-0778-grey/M0E20000000E0WX', 3);
    cy.get('[data-test=mini-cart-open-button]')
      .contains(/^\s*Cart\s*5\s*$/, { timeout: Cypress.config('graphqlTimeout') })
      .trigger('mouseenter');

    cy.get('[data-test=mini-cart-price]')
      .contains(/^\s*Total\s+815,90\s€\s*$/);

    cy.get('[data-test=mini-cart-line-item]')
      .should('have.length', 2)
      .eq(0)
      .then(($lineItem) => {
        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-link]')
          .should('have.attr', 'href', '/product/lemare-booties-0778-grey/M0E20000000E0WX')
          .should('contain', 'Booties Lemare grey');

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-quantity]')
          .should('contain', '3');

        cy.wrap($lineItem)
          .find('[data-test=cart-line-item-price]')
          .contains(/^\s*417,90\s€\s*$/);
      });

    cy.get('[data-test=cart-line-item-delete]')
      .eq(1)
      .click();
    cy.get('[data-test=mini-cart-open-button]')
      .contains(/^\s*Cart\s*3\s*$/, { timeout: Cypress.config('graphqlTimeout') })
      .click();
    cy.get('[data-test=mini-cart-content]')
      .find('[data-test=mini-cart-line-item]')
      .should('have.length', 1);
  });

  it('opens and closes mini-cart', () => {
    cy.get('[data-test=mini-cart-open-button]').trigger('mouseenter');
    cy.get('[data-test=mini-cart-content]').should('not.be.visible');

    cy.addLineItem('/product/lemare-booties-0778-brown/M0E20000000E0XM', 2);
    cy.get('[data-test=mini-cart-content]', { timeout: Cypress.config('graphqlTimeout') })
      .should('be.visible');
    cy.wait(3000)
      .should('not.be.visible');

    cy.get('[data-test=mini-cart-open-button]').trigger('mouseenter');
    cy.get('[data-test=mini-cart-content]').should('be.visible');
    cy.get('[data-test=mini-cart-open-button]').trigger('mouseleave');
    cy.get('[data-test=mini-cart-content]').should('not.be.visible');
  });
});
