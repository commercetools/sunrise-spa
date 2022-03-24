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

import { apolloClient as client } from '../../../src/apollo';
import * as query from './queries';
import * as mutation from './mutations';

const clientPromise = Promise.resolve(client);
const later = (resolve, time = 3000) =>
  new Promise((r) => setTimeout(() => r(resolve), time));
Cypress.Commands.add('login', (customer) => {
  cy.visit('/login');
  // cy.get('[data-test=login-button]').click();
  cy.get('[data-test=login-form-email]').type(
    customer.email
  );
  cy.get('[data-test=login-form-password]').type(
    customer.password
  );
  cy.get('[data-test=login-form-submit]').click();
  cy.get(`[data-test="login-button"]`).should('not.exist');
});
Cypress.Commands.add('logout', () => {
  cy.visit('/user/dashboard');
  cy.get('[data-test=sign-out]').click();
  cy.get(`[data-test="login-info-name"]`).should(
    'not.exist'
  );
});

Cypress.Commands.add('checkCustomerIsLoggedIn', () => {
  cy.get('[data-test=login-button]').should('not.exist');
  cy.get('[data-test=login-info-name]').should('exist');
});

Cypress.Commands.add('changeLanguage', (language) => {
  cy.get('[data-test=language-selector-dropdown]')
    .find('a')
    .contains(language)
    .click({ force: true });
});

Cypress.Commands.add('changeCountry', (country) => {
  cy.get('[data-test=country-selector-dropdown]')
    .find('a')
    .contains(country)
    .click({ force: true });
});

Cypress.Commands.add('createCustomer', (draft) =>
  cy.wrap(
    clientPromise.then((client) =>
      mutation
        .deleteCustomer(client, draft.email)
        .then(() => mutation.createCustomer(client, draft))
    )
  )
);

Cypress.Commands.add('deleteCustomer', ({ email }) =>
  cy
    .wrap(
      clientPromise.then((client) =>
        mutation.deleteCustomer(client, email)
      )
    )
    //delete resolves but data is not gone yet
    .then(later)
);

Cypress.Commands.add('addLineItem', (url, quantity) => {
  cy.visit(url);
  cy.get('input[data-test=add-to-cart-amount]')
    .clear()
    .type(quantity);
  cy.get('[data-test=add-to-cart-button]').click({
    force: true,
  });
  cy.wait(3000);
});

Cypress.Commands.add(
  'addDiscountCode',
  (cartDiscountDraft, code) =>
    cy.wrap(
      clientPromise.then((client) =>
        mutation
          .deleteDiscountCode(client, code)
          //delete resolves but data is not gone yet
          .then(later)
          .then(() =>
            mutation.createDiscountCode(
              client,
              cartDiscountDraft,
              code
            )
          )
      )
    )
);

Cypress.Commands.add(
  'createOrder',
  (cartDraft, orderDraft) =>
    cy.wrap(
      clientPromise.then((client) =>
        mutation
          .deleteOrder(client, orderDraft.orderNumber)
          //delete resolves but data is not gone yet
          .then(later)
          .then(() =>
            query
              .customerByEmail(
                client,
                cartDraft.customerEmail
              )
              .then((customer) => {
                const draft = {
                  ...cartDraft,
                  customerId: customer.id,
                };
                return mutation.createCart(client, draft);
              })
              .then((cart) => {
                const draft = {
                  ...orderDraft,
                  id: cart.id,
                  version: cart.version,
                };
                return mutation.createOrder(client, draft);
              })
          )
      )
    )
);

Cypress.Commands.add('addProduct', (draft) =>
  cy.wrap(
    clientPromise.then((client) =>
      mutation
        .deleteProduct(client, draft.key)
        .then(() => mutation.createProduct(client, draft))
    )
  )
);
