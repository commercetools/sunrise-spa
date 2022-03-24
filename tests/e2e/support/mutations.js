import gql from 'graphql-tag';
import * as query from './queries';

export function createCustomer(client, draft) {
  return client
    .mutate({
      mutation: gql`
        mutation createNewCustomer(
          $draft: CustomerSignMeUpDraft!
        ) {
          customerSignMeUp(draft: $draft) {
            customer {
              id
            }
          }
        }
      `,
      variables: {
        draft,
      },
    })
    .then(
      (response) => response.data.customerSignMeUp.customer
    );
}

export function createCart(client, draft) {
  return client
    .mutate({
      mutation: gql`
        mutation createCart($draft: CartDraft!) {
          createCart(draft: $draft) {
            id
            version
          }
        }
      `,
      variables: {
        draft,
      },
    })
    .then((response) => response.data.createCart);
}

export function createOrder(client, draft) {
  return client
    .mutate({
      mutation: gql`
        mutation createOrder($draft: OrderCartCommand!) {
          createOrderFromCart(draft: $draft) {
            id
          }
        }
      `,
      variables: {
        draft,
      },
    })
    .then((response) => response.data.createOrderFromCart);
}

export function createDiscountCode(
  client,
  cartDiscountDraft,
  code
) {
  return client
    .mutate({
      mutation: gql`
        mutation createNewCartDiscount(
          $draft: CartDiscountDraft!
        ) {
          createCartDiscount(draft: $draft) {
            id
          }
        }
      `,
      variables: {
        draft: cartDiscountDraft,
      },
    })
    .then((response) => response.data.createCartDiscount.id)
    .then((id) =>
      client.mutate({
        mutation: gql`
          mutation createNewDiscountCode(
            $id: String!
            $code: String!
          ) {
            createDiscountCode(
              draft: {
                code: $code
                cartDiscounts: {
                  typeId: "cart-discount"
                  id: $id
                }
              }
            ) {
              id
            }
          }
        `,
        variables: { code, id },
      })
    )
    .then((response) => response.data.createDiscountCode);
}

export function createProduct(client, draft) {
  return client
    .mutate({
      mutation: gql`
        mutation createNewProduct($draft: ProductDraft!) {
          createProduct(draft: $draft) {
            id
            version
          }
        }
      `,
      variables: {
        draft,
      },
    })
    .then((response) => {
      const { id, version } = response.data.createProduct;
      return updateProduct(client, {
        id,
        version,
        actions: [{ publish: {} }],
      });
    });
}

export function updateProduct(
  client,
  { id, version, actions }
) {
  return client
    .mutate({
      mutation: gql`
        mutation updateProduct(
          $id: String
          $version: Long!
          $actions: [ProductUpdateAction!]!
        ) {
          updateProduct(
            id: $id
            version: $version
            actions: $actions
          ) {
            id
            version
          }
        }
      `,
      variables: {
        id,
        version,
        actions,
      },
    })
    .then((response) => response.data.updateProduct);
}

export function deleteDiscountCode(client, code) {
  return query
    .discountCodeByCode(client, code)
    .then(async (discountCode) => {
      if (discountCode) {
        await client
          .mutate({
            mutation: gql`
              mutation deleteDiscountCode(
                $id: String!
                $version: Long!
              ) {
                deleteDiscountCode(
                  id: $id
                  version: $version
                ) {
                  id
                }
              }
            `,
            variables: {
              id: discountCode.id,
              version: discountCode.version,
            },
            // eslint-disable-next-line no-console
          })
          .catch((e) =>
            console.warn(
              'Discount code might have already been deleted',
              e
            )
          );
        await discountCode.cartDiscounts.forEach(
          (cartDiscount) =>
            client
              .mutate({
                mutation: gql`
                  mutation deleteCartDiscount(
                    $id: String!
                    $version: Long!
                  ) {
                    deleteCartDiscount(
                      id: $id
                      version: $version
                    ) {
                      id
                    }
                  }
                `,
                variables: {
                  id: cartDiscount.id,
                  version: cartDiscount.version,
                },
                // eslint-disable-next-line no-console
              })
              .catch((e) =>
                console.warn(
                  'Cart discount might have already been deleted',
                  e
                )
              )
        );
      }
    });
}

export function deleteOrder(client, orderNumber) {
  return query
    .orderByNumber(client, orderNumber)
    .then(async (order) => {
      if (order) {
        await client
          .mutate({
            mutation: gql`
              mutation deleteOrder(
                $id: String!
                $version: Long!
              ) {
                deleteOrder(id: $id, version: $version) {
                  id
                }
              }
            `,
            variables: {
              id: order.id,
              version: order.version,
            },
            // eslint-disable-next-line no-console
          })
          .catch((e) =>
            console.warn(
              'Order might have already been deleted',
              e
            )
          );
      }
    });
}

export function deleteCustomer(client, email) {
  return query
    .customerByEmail(client, email)
    .then(async (customer) => {
      if (customer) {
        await client
          .mutate({
            mutation: gql`
              mutation deleteCustomer(
                $id: String!
                $version: Long!
              ) {
                deleteCustomer(
                  id: $id
                  version: $version
                  personalDataErasure: true
                ) {
                  id
                }
              }
            `,
            variables: {
              id: customer.id,
              version: customer.version,
            },
            // eslint-disable-next-line no-console
          })
          .catch((e) =>
            console.warn(
              'Customer might have already been deleted',
              e
            )
          );
      }
    });
}

export function deleteProduct(client, key) {
  return query
    .productByKey(client, key)
    .then(async (product) => {
      if (product) {
        await updateProduct(client, {
          id: product.id,
          version: product.version,
          actions: [{ unpublish: { dummy: '' } }],
        }).then(async (unpublishedProduct) => {
          await client
            .mutate({
              mutation: gql`
                mutation deleteProduct(
                  $id: String!
                  $version: Long!
                ) {
                  deleteProduct(
                    id: $id
                    version: $version
                  ) {
                    id
                  }
                }
              `,
              variables: {
                id: unpublishedProduct.id,
                version: unpublishedProduct.version,
              },
              // eslint-disable-next-line no-console
            })
            .catch((e) =>
              console.warn(
                'Product might have already been deleted',
                e
              )
            );
        });
      }
    });
}
