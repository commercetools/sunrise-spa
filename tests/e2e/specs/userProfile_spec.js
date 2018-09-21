import { randomCustomer } from '../support/utils';

describe('user profile', () => {
  let oldCustomer;
  let newCustomer;

  before(() => {
    oldCustomer = randomCustomer();
    newCustomer = {
      firstName: `new-${oldCustomer.firstName}`,
      lastName: `new-${oldCustomer.lastName}`,
      email: `new-${oldCustomer.email}`,
    };
    cy.signup(oldCustomer);
  });

  it('updates customer info', () => {
    cy.get('[data-test=edit-profile-form-show]').click();

    cy.get('input[data-test=edit-profile-form-firstname]').clear().type(newCustomer.firstName);
    cy.get('input[data-test=edit-profile-form-lastname]').clear().type(newCustomer.lastName);
    cy.get('input[data-test=edit-profile-form-email]').clear().type(newCustomer.email);

    cy.get('[data-test=edit-profile-form-submit]').click();

    cy.get('[data-test=user-profile-name]').should('contain', `${newCustomer.firstName} ${newCustomer.lastName}`);
    cy.get('[data-test=user-profile-email]').should('contain', newCustomer.email);

    cy.get('[data-test=edit-profile-form-show]').click();
    cy.get('[data-test=user-profile-email]').should('not.contain', newCustomer.email);
    cy.get('[data-test=edit-profile-form-cancel]').click();
    cy.get('[data-test=user-profile-email]').should('contain', newCustomer.email);
  });
});
