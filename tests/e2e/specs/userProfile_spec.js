describe('user profile', () => {
  const oldCustomer = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'charlie.bucket+ci@commercetools.com',
    password: 'p@ssword',
  };

  const newCustomer = {
    firstName: `new-${oldCustomer.firstName}`,
    lastName: `new-${oldCustomer.lastName}`,
    email: `new-${oldCustomer.email}`,
    password: `new-${oldCustomer.password}`,
  };

  before(() => {
    cy.deleteCustomer(newCustomer);
    cy.login(oldCustomer);
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

  it('changes password', () => {
    cy.get('[data-test=change-password-button]').click();
    cy.get('[data-test=change-password-form-currentpassword]').type(oldCustomer.password);
    cy.get('[data-test=change-password-form-newpassword]').type(newCustomer.password);
    cy.get('[data-test=change-password-form-newpasswordconfirm]').type(newCustomer.password);

    cy.get('[data-test=logout-button]').click();
    cy.login(newCustomer);
    cy.checkCustomerIsLoggedIn(newCustomer);
  });
});
