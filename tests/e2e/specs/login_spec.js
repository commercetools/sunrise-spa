describe('Login', () => {
  const customer = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'charlie.bucket+ci@commercetools.com',
    password: 'p@ssword',
  };

  it('logs in', () => {
    cy.createCustomer(customer);
    cy.login(customer);
    cy.location('pathname').should('eq', '/user/account', { timeout: Cypress.config('graphqlTimeout') });
    cy.checkCustomerIsLoggedIn(customer);

    cy.reload();
    cy.location('pathname').should('eq', '/user/account', { timeout: Cypress.config('graphqlTimeout') });
    cy.checkCustomerIsLoggedIn(customer);

    cy.get('[data-test=logout-button]').click();
    cy.location('pathname').should('eq', '/login', { timeout: Cypress.config('graphqlTimeout') });
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

    cy.checkCustomerIsLoggedIn(customer);
  });
});
