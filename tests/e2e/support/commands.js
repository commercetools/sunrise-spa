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
import * as query from './queries';
import * as mutation from './mutations';

const clientPromise = createClient();

Cypress.Commands.add('login', customer => cy.createCustomer(customer).then(() => {
  cy.visit('/login');
  cy.get('[data-test=login-button]').click();
  cy.get('[data-test=login-form-email]').type(customer.email);
  cy.get('[data-test=login-form-password]').type(customer.password);
  cy.get('[data-test=login-form-submit]').click();
}));

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

Cypress.Commands.add('createProduct', (draft) => {
  console.log(draft);
  const createNewProduct = client => client.mutate({
    mutation: gql`
      mutation createNewProduct($draft: ProductDraft!){
        createProduct (draft: $draft) {
        id
        version
      }
  }`,
    variables: {
      draft,
    },
  });
  return cy.deleteProduct(draft).then(() => cy.wrap(clientPromise.then(client => createNewProduct(client))));
});

Cypress.Commands.add('deleteProduct', ({ key }) => {
  const deleteProduct = client => client.query({
    query: gql`
      query queryProductByKey($key: String!) {
        product(key: $key) {
            version,
            id
        }
      }`,
    variables: { key },
    fetchPolicy: 'network-only',
  }).then(async (response) => {
    const { product } = response.data;
    if (product) {
      await client.mutate({
        mutation: gql`
            mutation deleteProduct($id: String!, $version: Long!) {
              deleteProduct(id: $id, version: $version) {
                id
              }
            }`,
        variables: {
          id: product.id,
          version: product.version,
        },
      }).catch(e => console.warn('Product might have been already deleted', e));
    }
  });

  return cy.wrap(clientPromise.then(client => deleteProduct(client)));
});
