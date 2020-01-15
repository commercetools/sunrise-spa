const apiKey = '8f503737c8bf1a135b14b3b8b0325ccb4422c3b635cfb93eb30873c770282b01';
const MailSlurp = require('mailslurp-client').default;

const mailslurp = new MailSlurp({ apiKey });


describe('Login', () => {
  const customer = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'f4831546-0062-470d-b6a9-cacb8e0a2aa4@mailslurp.com',
    password: 'p@ssword',
  };

  const newPassword = 'newp@ssword';
  before(() => {
    cy.wrap(mailslurp.getAllEmails().then(emails => emails.content.forEach((e) => {
      mailslurp.deleteEmail(e.id);
    })));
  });

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

  it('resets password', () => {
    cy.visit('/forgot-password');
    cy.get('[data-test=forgot-password-email]').type(customer.email);
    cy.get('[data-test=forgot-password-form-submit]').click();
    cy.wrap(mailslurp.waitForEmailCount(1, 'f4831546-0062-470d-b6a9-cacb8e0a2aa4')
      .then(response => mailslurp.getEmail(response[0].id)
        .then(fullEmail => fullEmail.body.match(/a href="([^"]*)/)[1])))
      .then((link) => {
        cy.visit(link);
        cy.get('[data-test=reset-new-password]').type(newPassword);
        cy.get('[data-test=reset-confirm-password]').type(newPassword);
        cy.get('[data-test=reset-password-submit]').click();
        cy.login({ email: customer.email, password: newPassword });
        cy.checkCustomerIsLoggedIn(customer);
      });
  });
});
