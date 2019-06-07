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
  }).then(response => response.data.customers.results[0]);
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
  }).then(response => response.data.orders.results[0]);
}
