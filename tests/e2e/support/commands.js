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

Cypress.Commands.add('createMyOrder', (cartDraft, orderDraft) => {
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
    variables: { predicate: `email = "${cartDraft.customerEmail}"` },
    fetchPolicy: 'network-only',
  }).then((response) => {
    const customer = response.data.customers.results[0];
    const draft = Object.assign({}, cartDraft, { customerId: customer.id });
    return client.mutate({
      mutation: gql`
      mutation createMyCart($draft: CartDraft!){
      createCart (draft: $draft) {
        id, version
      }
  }`,
      variables: {
        draft,
      },
    });
  }).then((response) => {
    const cart = response.data.createCart;
    const draft = Object.assign({}, orderDraft, { id: cart.id, version: cart.version });
    client.mutate({
      mutation: gql`
          mutation createOrder($draft: OrderCartCommand!){
            createOrderFromCart(draft: $draft) {
              id
            }
          }`,
      variables: {
        draft,
      },
    });
  });
  return cy.deleteOrder(orderDraft).then(() => cy.wrap(clientPromise.then(client => createNewOrder(client))));
});

Cypress.Commands.add('deleteOrder', ({ orderNumber }) => {
  const deleteOrder = client => client.query({
    query: gql`
      query queryOrderByNumber($predicate: String) {
        orders(limit: 1, where: $predicate) {
          results {
            version,
            id
          }
        }
      }`,
    variables: { predicate: `orderNumber = "${orderNumber}"` },
    fetchPolicy: 'network-only',
  }).then(async (response) => {
    const order = response.data.orders.results[0];
    if (order) {
      await client.mutate({
        mutation: gql`
            mutation deleteOldOrder($id: String!, $version: Long!) {
              deleteOrder(id: $id, version: $version) {
                id
              }
            }`,
        variables: {
          id: order.id,
          version: order.version,
        },
      }).catch(e => console.warn('Order might have been already deleted', e));
    }
  });

  return cy.wrap(clientPromise.then(client => deleteOrder(client)));
});
