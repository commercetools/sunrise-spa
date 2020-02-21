const MailSlurp = require('mailslurp-client').default;

const apiKey = Cypress.env('MAILSLURP_KEY');
const msEmail = Cypress.env('MAILSLURP_EMAIL');
const mailslurp = new MailSlurp({ apiKey });


describe('Login', () => {
  const customer = {
    firstName: 'Charlie',
    lastName: 'Bucket',
    email: 'charlie.bucket+ci@commercetools.com',
    password: 'p@ssword',
  };

  const newCustomer = {
    firstName: 'Andy',
    lastName: 'Garcia',
    email: msEmail,
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
    cy.location('pathname').should('eq', '/en/user/account', { timeout: Cypress.config('graphqlTimeout') });
    cy.checkCustomerIsLoggedIn(customer);

    cy.reload();
    cy.location('pathname').should('eq', '/en/user/account', { timeout: Cypress.config('graphqlTimeout') });
    cy.checkCustomerIsLoggedIn(customer);

    cy.get('[data-test=logout-button]').click();
    cy.location('pathname').should('eq', '/en/login', { timeout: Cypress.config('graphqlTimeout') });
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
    cy.createCustomer(newCustomer);
    cy.visit('/forgot-password');
    cy.get('[data-test=forgot-password-email]').type(newCustomer.email);
    cy.get('[data-test=forgot-password-form-submit]').click();
    cy.wrap(mailslurp.waitForEmailCount(1, msEmail.substring(0, msEmail.lastIndexOf('@')))
      .then(response => mailslurp.getEmail(response[0].id)
        .then(fullEmail => fullEmail.body.match(/a href="([^"]*)/)[1])))
      .then((link) => {
        cy.visit(link);
        cy.get('[data-test=reset-new-password]').type(newPassword);
        cy.get('[data-test=reset-confirm-password]').type(newPassword);
        cy.get('[data-test=reset-password-submit]').click();
        cy.login({ email: newCustomer.email, password: newPassword });
        cy.checkCustomerIsLoggedIn(newCustomer);
      });
  });
});
