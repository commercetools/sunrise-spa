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
        <ShipmentInfo />
        <CartLikeSummary :cart-like="me.order"/>
      </div>
      <div v-else>
        <h1 class="text-center">{{ $t('notFound') }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ShipmentInfo from './ShipmentInfo.vue';
import BaseDate from '../../common/BaseDate.vue';
import CartLikeSummary from '../../common/cartlike/CartLikeSummary.vue';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  components: {
    CartLikeSummary,
    ShipmentInfo,
    BaseDate,
  },

  data: () => ({
    me: null,
  }),

  computed: {
    orderNumber() {
      return this.$route.params.orderNumber;
    },
  },

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
              shippingInfo {
                price {
                  ...DisplayableMoney
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
        ${DisplayableMoneyFragment}`,
      variables() {
        return {
          orderNumber: this.orderNumber,
          locale: this.$store.state.locale,
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
