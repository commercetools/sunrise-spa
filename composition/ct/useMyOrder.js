import gql from 'graphql-tag';
import { useState } from 'react';
import useQueryFacade from '../useQueryFacade';
const query = gql`
  query orderById($id: String, $locale: Locale!) {
    me {
      order(id: $id) {
        id
        version
        orderNumber
        createdAt
        lineItems {
          lineId: id
          name(locale: $locale)
          productSlug(locale: $locale)
          quantity
          price {
            value {
              centAmount
              currencyCode
              fractionDigits
            }
            discounted {
              value {
                centAmount
                currencyCode
                fractionDigits
              }
              discount {
                name(locale: $locale)
              }
            }
          }
          totalPrice {
            centAmount
            currencyCode
            fractionDigits
          }
          variant {
            sku
            images {
              url
            }
            attributesRaw {
              name
              value
              attributeDefinition {
                type {
                  name
                }
                name
                label(locale: $locale)
              }
            }
          }
        }
        totalPrice {
          centAmount
          currencyCode
          fractionDigits
        }
        shippingInfo {
          shippingMethod {
            name
            localizedDescription(locale: $locale)
          }
          price {
            centAmount
            currencyCode
            fractionDigits
          }
        }
        taxedPrice {
          totalGross {
            centAmount
            currencyCode
            fractionDigits
          }
          totalNet {
            centAmount
            currencyCode
            fractionDigits
          }
        }
        discountCodes {
          discountCode {
            id
            code
            name(locale: $locale)
          }
        }
        shippingAddress {
          firstName
          lastName
          streetName
          additionalStreetInfo
          postalCode
          city
          country
          phone
          email
        }
        billingAddress {
          firstName
          lastName
          streetName
          additionalStreetInfo
          postalCode
          city
          country
          phone
          email
        }
        paymentInfo {
          payments {
            paymentStatus {
              interfaceCode
            }
          }
        }
        returnInfo {
          items {
            id
            type
            ...returnedItem
          }
        }
      }
    }
  }

  fragment returnedItem on LineItemReturnItem {
    lineItemId
    quantity
    shipmentState
    paymentState
  }
`;

function useMyOrder({ locale, id }) {
  const [order, setOrder] = useState(null);
  const { loading, error } = useQueryFacade(query, {
    variables: { id, locale },
    onCompleted: (data) => {
      if (!data) {
        return;
      }

      const order = data.me.order;
      const returned = data.me.order.returnInfo
        .flatMap(({ items }) => items.map((item) => item))
        .reduce((acc, item) => {
          const q = acc.get(item.lineItemId)?.quantity || 0;
          acc.set(item.lineItemId, {
            ...item,
            quantity: item.quantity + q,
          });
          return acc;
        }, new Map());
      console.log([...returned.values()]);
      setOrder({
        ...order,
        lineItems: order.lineItems
          .map((item) => {
            const q = returned.get(item.lineId)?.quantity;
            return q
              ? { ...item, quantity: item.quantity - q }
              : item;
          })
          .filter(({ quantity }) => Boolean(quantity)),
        returnItems: {
          //TODO: I can have several returnInfos for one order. Need to create a map for each return info here.
          lineItems: data.me.order.returnInfo
            .flatMap(({ items }) =>
              items.map((item) => item)
            )
            .map(
              ({
                lineItemId,
                quantity,
                shipmentState,
                paymentState,
              }) => ({
                ...order.lineItems.find(
                  ({ lineId }) => lineId === lineItemId
                ),
                quantity,
                shipmentState,
                paymentState,
              })
            ),
        },
      });
    },
  });
  return { loading, error, order };
}
export default useMyOrder;
