import { apolloClient, cache } from '../../src/apollo';
import { getValue } from '../../src/lib';
import useMutation from '../useMutationFacade';
import useCart from '../useCart';
import gql from 'graphql-tag';
export const createPayment = ({
  currency,
  centAmount,
  method,
}) =>
  apolloClient
    .mutate({
      mutation: gql`
        mutation createMyPayment($draft: MyPaymentDraft!) {
          createMyPayment(draft: $draft) {
            paymentId: id
            version
          }
        }
      `,
      variables: {
        draft: {
          amountPlanned: {
            currencyCode: currency,
            centAmount,
          },
          paymentMethodInfo: {
            method,
          },
        },
      },
    })
    .then((result) => ({
      version: result.data.createMyPayment.version,
      id: result.data.createMyPayment.paymentId,
    }));

const create = gql`
  mutation createCart($draft: MyCartDraft!) {
    createMyCart(draft: $draft) {
      cartId: id
      version
    }
  }
`;
const mutation = gql`
  mutation mutateCart(
    $actions: [MyCartUpdateAction!]!
    $version: Long!
    $id: String!
  ) {
    updateMyCart(
      actions: $actions
      version: $version
      id: $id
    ) {
      id
      version
      lineItems {
        lineId: id
        quantity
      }
    }
  }
`;

export const addLineItem = (sku, quantity, channel) => [
  {
    addLineItem: {
      sku,
      quantity,
      ...(channel
        ? {
            distributionChannel: {
              id: channel,
              typeId: 'channel',
            },
          }
        : undefined),
    },
  },
];
export const setBillingAddress = (address) => ({
  setBillingAddress: {
    address,
  },
});
export const setShippingAddress = (address) => ({
  setShippingAddress: {
    address,
  },
});
export const createMyOrderFromCart = (id, version) => {
  return {
    variables: {
      id,
      version,
    },
    mutation: gql`
      mutation createOrder($id: String!, $version: Long!) {
        createMyOrderFromCart(
          draft: { id: $id, version: $version }
        ) {
          cartId: id
          version
        }
      }
    `,
  };
};
export const changeCartLineItemQuantity = (
  id,
  quantity
) => [
  {
    changeLineItemQuantity: { lineItemId: id, quantity },
  },
];
export const removeLineItem = (lineItemId) => [
  {
    removeLineItem: { lineItemId },
  },
];
export const addDiscountCode = (code) => [
  { addDiscountCode: { code } },
];
export const removeDiscountCode = (id) => [
  {
    removeDiscountCode: {
      discountCode: { id, typeId: 'discount-code' },
    },
  },
];
export const setShippingMethod = (shippingMethodId) => [
  {
    setShippingMethod: {
      shippingMethod: {
        typeId: 'shipping-method',
        id: shippingMethodId,
      },
    },
  },
];

//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useCartMutation = ({ location, currency }) => {
  const [mutateFunction, { data, loading, error }] =
    useMutation(mutation);
  const [createCart] = useMutation(create);
  const { cart, exist } = useCart();
  const mutateCart = (actions) => {
    return Promise.resolve()
      .then(() => {
        if (!getValue(exist) === true) {
          return createCart({
            variables: {
              draft: {
                currency: getValue(currency),
                country: getValue(location),
                shippingAddress: {
                  country: getValue(location),
                },
              },
            },
          }).then((result) => ({
            version: result.data.createMyCart.version,
            id: result.data.createMyCart.cartId,
          }));
        }
        return {
          version: getValue(cart).version,
          id: getValue(cart).cartId,
        };
      })
      .then(({ version, id }) =>
        mutateFunction({
          variables: {
            actions,
            version,
            id,
          },
        })
      )
      .then((result) => {
        if (!result.data.updateMyCart.lineItems.length) {
          return apolloClient.mutate({
            mutation: gql`
              mutation deleteCart(
                $version: Long!
                $id: String!
              ) {
                deleteMyCart(version: $version, id: $id) {
                  id
                }
              }
            `,
            variables: {
              id: result.data.updateMyCart.id,
              version: result.data.updateMyCart.version,
            },
          });
        }
        return result;
      })
      .then((result) => {
        cache.evict({ id: 'activeCart' });
        cache.gc();
        return result;
      });
  };
  return {
    mutateCart,
    data,
    loading,
    error,
  };
};

export default useCartMutation;
