describe('Login', () => {
  const customer = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'charlie.bucket+ci@commercetools.com',
    password: 'p@ssword',
  };

  function checkCustomerIsLoggedIn() {
    cy.get('[data-test=user-profile-name]').should('contain', `${customer.firstName} ${customer.lastName}`);
    cy.get('[data-test=user-profile-email]').should('contain', customer.email);

    cy.get('[data-test=login-button]').should('not.exist');
    cy.get('[data-test=logout-button]').should('exist');
    cy.get('[data-test=login-info-name]').should('contain', customer.firstName);
  }

  it('logs in', () => {
    cy.login(customer);
    cy.location('pathname').should('eq', '/user');
    checkCustomerIsLoggedIn();

    cy.reload();
    cy.location('pathname').should('eq', '/user');
    checkCustomerIsLoggedIn();

    cy.get('[data-test=logout-button]').click();
    cy.location('pathname').should('eq', '/login');
    cy.get('[data-test=login-button]').should('exist');
    cy.get('[data-test=logout-button]').should('not.exist');
    cy.get('[data-test=login-info-name]').should('not.exist');
  });

  it('signs up', () => {
    cy.deleteCustomer(customer);
    cy.visit('/login');
    cy.get('[data-test=signup-form-firstname]').type(customer.firstName);
    cy.get('[data-test=signup-form-lastname]').type(customer.lastName);
    cy.get('[data-test=signup-form-email]').type(customer.email);
    cy.get('[data-test=signup-form-password]').type(customer.password);
    cy.get('[data-test=signup-form-repeatpassword]').type(customer.password);
    cy.get('[data-test=signup-form-agreetoterms]').check();
    cy.get('[data-test=signup-form-submit]').click();

    checkCustomerIsLoggedIn();
  });
});
