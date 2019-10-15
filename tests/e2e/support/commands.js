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

import createClient from './test-apollo';
import * as query from './queries';
import * as mutation from './mutations';

const clientPromise = createClient();

Cypress.Commands.add('login', (customer) => {
  cy.visit('/login');
  cy.get('[data-test=login-button]').click();
  cy.get('[data-test=login-form-email]').type(customer.email);
  cy.get('[data-test=login-form-password]').type(customer.password);
  cy.get('[data-test=login-form-submit]').click();
});

Cypress.Commands.add('checkCustomerIsLoggedIn', (customer) => {
  cy.get('[data-test=user-profile-name]').should('contain', `${customer.firstName} ${customer.lastName}`);
  cy.get('[data-test=user-profile-email]').should('contain', customer.email);

  cy.get('[data-test=login-button]').should('not.exist');
  cy.get('[data-test=logout-button]').should('exist');
  cy.get('[data-test=login-info-name]').should('contain', customer.firstName);
});

Cypress.Commands.add('changeLanguage', (language) => {
  cy.get('[data-test=location-selector-open-button]').click();
  cy.get('span[data-test=location-selector-dropdown]')
    .click()
    .parent()
    .contains(language)
    .click();
});

Cypress.Commands.add('createCustomer', draft => cy.wrap(clientPromise
  .then(client => mutation.deleteCustomer(client, draft.email)
    .then(() => mutation.createCustomer(client, draft)))));

Cypress.Commands.add('deleteCustomer', ({ email }) => cy.wrap(clientPromise
  .then(client => mutation.deleteCustomer(client, email))));

Cypress.Commands.add('addLineItem', (url, quantity) => {
  cy.visit(url);
  cy.get('span[data-test=add-to-cart-form-quantity-dropdown]')
    .click()
    .parent()
    .contains(`${quantity}`)
    .click();
  cy.get('[data-test=add-to-cart-form-button]').click();
  cy.get('[data-test=mini-cart-content]').should('be.visible');
});

Cypress.Commands.add('addDiscountCode', (cartDiscountDraft, code) => cy.wrap(clientPromise
  .then(client => mutation.deleteDiscountCode(client, code)
    .then(() => mutation.createDiscountCode(client, cartDiscountDraft, code)))));

Cypress.Commands.add('createOrder', (cartDraft, orderDraft) => cy.wrap(clientPromise
  .then(client => mutation.deleteOrder(client, orderDraft.orderNumber)
    .then(() => query.customerByEmail(client, cartDraft.customerEmail)
      .then((customer) => {
        const draft = Object.assign({}, cartDraft, { customerId: customer.id });
        return mutation.createCart(client, draft);
      }).then((cart) => {
        const draft = Object.assign({}, orderDraft, { id: cart.id, version: cart.version });
        return mutation.createOrder(client, draft);
      })))));

Cypress.Commands.add('addProduct', draft => cy.wrap(clientPromise
  .then(client => mutation.deleteProduct(client, draft.key)
    .then(() => mutation.createProduct(client, draft)))));
