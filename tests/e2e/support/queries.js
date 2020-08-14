import gql from 'graphql-tag';

export function customerByEmail(client, email) {
  return client.query({
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
  }).then((response) => response.data.customers.results[0]);
}

export function orderByNumber(client, orderNumber) {
  return client.query({
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
  }).then((response) => response.data.orders.results[0]);
}

export function discountCodeByCode(client, code) {
  return client.query({
    query: gql`
      query queryDiscountCodeByCode($predicate: String) {
        discountCodes(limit: 1, where: $predicate) {
          results {
            version,
            id
            cartDiscounts {
              id
              version
            }
          }
        }
      }`,
    variables: { predicate: `code = "${code}"` },
    fetchPolicy: 'network-only',
  }).then((response) => response.data.discountCodes.results[0]);
}

export function productByKey(client, key) {
  return client.query({
    query: gql`
      query queryProductByKey($key: String!) {
        product(key: $key) {
            version,
            id
        }
      }`,
    variables: { key },
    fetchPolicy: 'network-only',
  }).then((response) => response.data.product);
}
