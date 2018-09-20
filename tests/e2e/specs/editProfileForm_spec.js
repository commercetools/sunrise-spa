import { randomCustomer } from '../support/utils';

describe('edit profile form', () => {
  const oldCustomer = randomCustomer();
  const newCustomer = randomCustomer();

  before(() => {
    cy.signup(oldCustomer);
  });

  it('updates customer info', () => {
    cy.get('[data-test=personal-details-edit-show-btn]').click();

    cy.get('input[data-test=edit-form-firstName]').clear().type(newCustomer.firstName);
    cy.get('input[data-test=edit-form-lastName]').clear().type(newCustomer.lastName);
    cy.get('input[data-test=edit-form-email]').clear().type(newCustomer.email);

    cy.get('[data-test=edit-form-submit]').click();

    cy.get('[data-test=user-profile-name]')
      .should('not.contain', `${oldCustomer.firstName} ${oldCustomer.lastName}`)
      .should('contain', `${newCustomer.firstName} ${newCustomer.lastName}`);
    cy.get('[data-test=user-profile-email]')
      .should('not.contain', oldCustomer.email)
      .should('contain', newCustomer.email);
  });
});
