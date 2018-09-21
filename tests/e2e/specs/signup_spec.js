import { randomCustomer } from '../support/utils';

describe('Sign up', () => {
  let customer;

  before(() => {
    customer = randomCustomer();
    cy.visit('/login');
  });

  it('signs up', () => {
    cy.get('[data-test=signup-form-firstname]').type(customer.firstName);
    cy.get('[data-test=signup-form-lastname]').type(customer.lastName);
    cy.get('[data-test=signup-form-email]').type(customer.email);
    cy.get('[data-test=signup-form-password]').type(customer.password);
    cy.get('[data-test=signup-form-repeatpassword]').type(customer.password);
    cy.get('[data-test=signup-form-agreetoterms]').check();
    cy.get('[data-test=signup-form-submit]').click();

    cy.get('[data-test=user-profile-name]').should('contain', `${customer.firstName} ${customer.lastName}`);
    cy.get('[data-test=user-profile-email]').should('contain', customer.email);

    cy.get('[data-test=login-info-name]').should('contain', customer.firstName);
    cy.get('[data-test=login-button]').should('not.exist');
    cy.get('[data-test=logout-button]').should('exist');
  });
});
