<template>
  <div class="col-sm-9">
    <div v-if="me"
         class="my-orders col-sm-12">
      <div v-if="me.order"
           class="my-orders-order-content">
        <div class="your-order-details-wrapper">
          <div class="your-order-details-title">
            <h5>{{ $t('title')}}</h5>
          </div>
          <div class="your-order-details">
            <span class="your-order-details-titles">
              {{ $t('orderNumber') }}
              <br>
              {{ $t('date') }}
            </span>
            <span class="your-order-details-info">
              <span data-test="details-order-number">{{ me.order.orderNumber }}</span>
              <br>
              <BaseDate :date="me.order.createdAt"
                        :format="'short'"
                        data-test="details-order-date"/>
            </span>
          </div>
          <button onclick="window.print()"
                  class="my-orders-print-receipt-btn hidden-xs">
            {{ $t('print') }}
          </button>
        </div>
        <CartLikeOrderDetail :cart-like="me.order" />
        <CartLikeContentSummary :cart-like="me.order"/>
      </div>
      <div v-else>
        <h1 class="text-center">{{ $t('notFound') }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BaseDate from '../../common/BaseDate.vue';
import CartLikeOrderDetail from '../../common/cartlike/CartLikeOrderDetail.vue';
import CartLikeContentSummary from '../../common/cartlike/CartLikeContentSummary.vue';
import DISPLAYABLE_MONEY_FRAGMENT from '../../DisplayableMoney.gql';
import BASE_ADDRESS_FRAGMENT from '../../BaseAddress.gql';

export default {
  components: {
    CartLikeOrderDetail,
    CartLikeContentSummary,
    BaseDate,
  },

  data: () => ({
    me: null,
  }),

  apollo: {
    me: {
      query: gql`
        query orderByOrderNumber($orderNumber: String, $locale: Locale!) {
          me {
            order(orderNumber: $orderNumber) {
              id
              version
              orderNumber
              createdAt
              shippingAddress {
                ...BaseAddress
              }
              billingAddress {
                ...BaseAddress
              }
              shippingInfo {
                price {
                  ...DisplayableMoney
                }
                shippingMethod {
                  name
                  description
                }
              }
              paymentInfo {
                payments {
                  paymentMethodInfo {
                    method
                  }
                }
              }
              taxedPrice {
                totalGross {
                  ...DisplayableMoney
                }
                totalNet {
                  ...DisplayableMoney
                }
                taxPortions {
                  amount {
                    ...DisplayableMoney
                  }
                }
              }
              totalPrice {
                ...DisplayableMoney
              }
              discountCodes {
                discountCode {
                  id
                  code
                  name(locale: $locale)
                }
              }
              lineItems {
                id
                quantity
                name(locale: $locale)
                productSlug(locale: $locale)
                price{
                    value {
                      ...DisplayableMoney
                    }
                    discounted {
                      value {
                        ...DisplayableMoney
                      }
                    }
                  }
                totalPrice {
                  ...DisplayableMoney
                }
                variant {
                  images {
                    url
                    label
                  }
                  sku
                }
              }
            }
          }
        }
        ${DISPLAYABLE_MONEY_FRAGMENT}
        ${BASE_ADDRESS_FRAGMENT}`,
      variables() {
        return {
          orderNumber: this.$route.params.orderNumber,
          locale: this.$i18n.locale,
        };
      },
    },
  },
};
</script>

<i18n>
en:
  title: "Your order details"
  orderNumber: "Order Number"
  date: "Date"
  print: "Print receipt"
  description: "Description"
  quantity: "Quantity"
  price: "Price"
  total: "Total"
  notFound: "Order not found"
de:
  title: "Ihre Bestelldetails"
  orderNumber: "Bestellnummer"
  date: "Datum"
  print: "Beleg drucken"
  description: "Beschreibung"
  quantity: "Menge"
  price: "Preis"
  total: "Gesamtpreis"
  notFound: "Bestellung nicht gefunden"
</i18n>
