import { randomCustomer } from '../support/utils';

describe('Login', () => {
  let customer;

  function shouldBeLoggedIn() {
    cy.location('pathname').should('eq', '/user');
    cy.get('[data-test=login-info-name]').should('contain', customer.firstName);
    cy.get('[data-test=login-button]').should('not.exist');
    cy.get('[data-test=logout-button]').should('exist');
    cy.get('[data-test=user-profile-name]').should('contain', `${customer.firstName} ${customer.lastName}`);
    cy.get('[data-test=user-profile-email]').should('contain', customer.email);
  }

  before(() => {
    customer = randomCustomer();
    cy.signup(customer);
    cy.logout();
    cy.visit('/login');
  });

  it('logs in', () => {
    cy.get('[data-test=login-button]').click();
    cy.get('[data-test=login-form-email]').type(customer.email);
    cy.get('[data-test=login-form-password]').type(customer.password);
    cy.get('[data-test=login-form-submit]').click();
    shouldBeLoggedIn();

    cy.reload();
    shouldBeLoggedIn();

    cy.logout();
    cy.location('pathname').should('eq', '/login');
    cy.get('[data-test=login-button]').should('exist');
    cy.get('[data-test=logout-button]').should('not.exist');
    cy.get('[data-test=login-info-name]').should('not.exist');
  });
});
