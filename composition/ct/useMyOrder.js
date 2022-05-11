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
                id
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
      setOrder({
        ...order,
        returnItems: {
          //TODO: I can have several returnInfos for one order. Need to create a map for each return info here.
          lineItems: order.returnInfo[0]?.items.map(
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
