// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('signup', (customer) => {
  cy.visit('/login');
  cy.get('[data-test=signup-form-firstname]').type(customer.firstName);
  cy.get('[data-test=signup-form-lastname]').type(customer.lastName);
  cy.get('[data-test=signup-form-email]').type(customer.email);
  cy.get('[data-test=signup-form-password]').type(customer.password);
  cy.get('[data-test=signup-form-repeatpassword]').type(customer.password);
  cy.get('[data-test=signup-form-agreetoterms]').check();
  cy.get('[data-test=signup-form-submit]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-test=logout-button]').click();
});
