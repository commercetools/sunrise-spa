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

import gql from 'graphql-tag';
import createClient from './test-apollo';

const clientPromise = createClient();

Cypress.Commands.add('login', customer => cy.createCustomer(customer).then(() => {
  cy.visit('/login');
  cy.get('[data-test=login-button]').click();
  cy.get('[data-test=login-form-email]').type(customer.email);
  cy.get('[data-test=login-form-password]').type(customer.password);
  cy.get('[data-test=login-form-submit]').click();
}));

Cypress.Commands.add('createCustomer', (draft) => {
  const createCustomer = client => client.mutate({
    mutation: gql`
        mutation createNewCustomer($draft: CustomerSignMeUpDraft!) {
          customerSignMeUp(draft: $draft) {
            customer {
              id
            }
          }
        }`,
    variables: { draft },
  });

  return cy.deleteCustomer(draft).then(() => cy.wrap(clientPromise.then(client => createCustomer(client))));
});

Cypress.Commands.add('deleteCustomer', ({ email }) => {
  const deleteCustomer = client => client.query({
    query: gql`
      query queryCustomerByEmail($predicate: String) {
        customers(limit: 1, where: $predicate) {
          results {
            id
            version
          }
        }
      }`,
    variables: { predicate: `email = "${email}"` },
    fetchPolicy: 'network-only',
  }).then(async (response) => {
    const customer = response.data.customers.results[0];
    if (customer) {
      await client.mutate({
        mutation: gql`
            mutation deleteOldCustomer($id: String!, $version: Long!) {
              deleteCustomer(id: $id, version: $version, personalDataErasure: true) {
                id
              }
            }`,
        variables: {
          id: customer.id,
          version: customer.version,
        },
      }).catch(e => console.warn('Customer might have been already deleted', e));
    }
  });

  return cy.wrap(clientPromise.then(client => deleteCustomer(client)));
});

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

Cypress.Commands.add('createMyOrder', (draft) => {
  const createNewOrder = client => client.query({
    query: gql`
      query queryCustomerByEmail($predicate: String) {
        customers(limit: 1, where: $predicate) {
          results {
            id
            version
          }
        }
      }`,
    variables: { predicate: `email = "${draft.customerEmail}"` },
    fetchPolicy: 'network-only',
  }).then(async (response) => {
    const customer = response.data.customers.results[0];
    return client.mutate({
      mutation: gql`
      mutation createMyCart($draft: CartDraft!){
      createCart (draft: $draft) {
        id, version
      }
  }`,
      variables: { draft: { ...draft, customerId: customer.id } },
    });
  }).then((response) => {
    const cart = response.data.createCart;
    const orderNumber = function orderNumber() { return Math.floor(Math.random() * 10000).toString(); };
    client.mutate({
      mutation: gql`
          mutation createOrder($draft: OrderCartCommand!){
            createOrderFromCart(draft: $draft) {
              id
            }
          }`,
      variables: { draft: { id: cart.id, version: cart.version, orderNumber: orderNumber() } },
    });
  });
  return cy.wrap(clientPromise.then(client => createNewOrder(client)));
});
