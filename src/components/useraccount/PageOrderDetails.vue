<template>
  <div class="col-sm-9">
    <div v-if="me"
         class="my-orders col-sm-12">
      <div class="my-orders-order-content">
        <div class="row">
          <div class="col-sm-12">
            <div class="my-orders-title hidden-xs">
              <h4>{{ $t('myOrders')}}</h4>
            </div>
          </div>
        </div>
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
        <Addresses :shippingAddress="me.order.shippingAddress"
                   :billingAddress="me.order.billingAddress"/>
        <div class="row">
          <Shipping :shippingMethod="me.order.shippingInfo.shippingMethod"/>
          <Payment :paymentInfo="me.order.paymentInfo"/>
        </div>
        <PriceCalculation :prices="prices"
                          class="my-orders-order-price-summary-wrapper"/>
        <div class="order-list-summary-titles-wrapper">
          <div class="row">
            <div class="col-sm-6">
              <div>{{ $t('description') }}</div>
            </div>
            <div class="col-sm-2">
              <div class="text-right">{{ $t('quantity') }}</div>
            </div>
            <div class="col-sm-2">
              <div class="text-right">{{ $t('price') }}</div>
            </div>
            <div class="col-sm-2">
              <div class="text-right">{{ $t('total') }}</div>
            </div>
          </div>
    </div>
        <LineItem v-for="lineItem in me.order.lineItems"
              :key="lineItem.id"
              :lineItem="lineItem"
              class="order-detail-wrapper"/>
        <div class="order-print-receipt-btn-wrapper"></div>
      </div>
    </div>
    <!-- <div v-else>
      <h1 class="text-center">Order <b>{{ orderNumber }}</b> not found</h1>
    </div> -->
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BaseDate from '../common/BaseDate.vue';
import Addresses from '../common/Addresses.vue';
import Shipping from '../common/Shipping.vue';
import Payment from '../common/Payment.vue';
import PriceCalculation from '../cartdetail/PriceCalculation.vue';
import LineItem from '../cartdetail/LineItem.vue';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  components: {
    BaseDate,
    Addresses,
    Shipping,
    Payment,
    PriceCalculation,
    LineItem,
  },

  data: () => ({
    me: null,
  }),

  computed: {
    orderNumber() {
      return this.$route.params.orderNumber;
    },

    prices() {
      const obj = {
        lineItems: this.me.order.lineItems,
        shippingInfo: this.me.order.shippingInfo,
        taxedPrice: this.me.order.taxedPrice,
        totalPrice: this.me.order.totalPrice,
      };
      return obj;
    },
  },

  apollo: {
    me: {
      query: gql`
        query orderByOrderNumber($orderNumber: String, $locale: Locale!) {
          me {
            order(orderNumber: $orderNumber) {
              version
              orderNumber
              createdAt
              shippingAddress {
                title
                firstName
                lastName
                streetName
                streetNumber
                additionalStreetInfo
                city
                postalCode
                region
                country
                contactInfo {
                  phone
                  email
                }
              }
              billingAddress {
                title
                firstName
                lastName
                streetName
                streetNumber
                additionalStreetInfo
                city
                postalCode
                region
                country
                contactInfo {
                  phone
                  email
                }
              }
              shippingInfo {
                shippingMethod {
                  name
                  description
                }
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
              paymentInfo {
                payments {
                  paymentMethodInfo {
                    method
                  }
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
                  attributes {
                    ... on mainProductType {
                      colorFreeDefinition {
                        value(locale: $locale)
                      }
                      size {
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ${DisplayableMoneyFragment}`,
      variables() {
        return {
          orderNumber: this.orderNumber,
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
  myOrders: "My Orders"
  orderNumber: "Order Number"
  date: "Date"
  print: "Print receipt"
de:
  title: "Ihre Bestelldetails"
  myOrders: "Meine Bestellungen"
  orderNumber: "Bestellnummer"
  date: "Datum"
  total: "Gesamtpreis"
  print: "Beleg drucken"
</i18n>
