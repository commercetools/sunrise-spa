import gql from 'graphql-tag';
import * as query from './queries';

export function createCustomer(client, draft) {
  return client.mutate({
    mutation: gql`
      mutation createNewCustomer($draft: CustomerSignMeUpDraft!) {
        customerSignMeUp(draft: $draft) {
          customer {
            id
          }
        }
      }`,
    variables: {
      draft,
    },
  }).then(response => response.data.customerSignMeUp.customer);
}

export function createCart(client, draft) {
  return client.mutate({
    mutation: gql`
      mutation createCart($draft: CartDraft!){
        createCart (draft: $draft) {
          id, version
        }
      }`,
    variables: {
      draft,
    },
  }).then(response => response.data.createCart);
}

export function createOrder(client, draft) {
  return client.mutate({
    mutation: gql`
      mutation createOrder($draft: OrderCartCommand!){
        createOrderFromCart(draft: $draft) {
          id
        }
      }`,
    variables: {
      draft,
    },
  }).then(response => response.data.createOrderFromCart);
}

export function deleteOrder(client, orderNumber) {
  return query.orderByNumber(client, orderNumber)
    .then(async (order) => {
      if (order) {
        await client.mutate({
          mutation: gql`
            mutation deleteOrder($id: String!, $version: Long!) {
              deleteOrder(id: $id, version: $version) {
                id
              }
            }`,
          variables: {
            id: order.id,
            version: order.version,
          },
        }).then(response => response.data.deleteOrder)
          .catch(e => console.warn('Order might have already been deleted', e));
      }
    });
}

export function deleteCustomer(client, email) {
  return query.customerByEmail(client, email)
    .then(async (customer) => {
      if (customer) {
        await client.mutate({
          mutation: gql`
            mutation deleteCustomer($id: String!, $version: Long!) {
              deleteCustomer(id: $id, version: $version, personalDataErasure: true) {
                id
              }
            }`,
          variables: {
            id: customer.id,
            version: customer.version,
          },
        }).then(response => response.data.deleteCustomer)
          .catch(e => console.warn('Customer might have already been deleted', e));
      }
    });
}
