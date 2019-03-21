<template>
  <div v-if="me">
    <div class="row">
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">{{ $t('shippingAddress') }}</div>
          <div>
            {{me.order.shippingAddress.title}}
            {{me.order.shippingAddress.firstName}}
            {{me.order.shippingAddress.lastName}}
          </div>
          <div>{{me.order.shippingAddress.streetName}} {{me.order.shippingAddress.streetNumber}}</div>
          <div>{{me.order.shippingAddress.additionalStreetInfo}}</div>
          <div>{{me.order.shippingAddress.city}}</div>
          <div>{{me.order.shippingAddress.postalCode}} {{me.order.shippingAddress.region}}</div>
          <div>{{me.order.shippingAddress.country}}</div>
          <br>
          <div>{{me.order.shippingAddress.contactInfo.phone}}</div>
          <div>{{me.order.shippingAddress.contactInfo.email}}</div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">{{ $t('billingAddress') }}</div>
          <div>
            {{me.order.billingAddress.title}}
            {{me.order.billingAddress.firstName}}
            {{me.order.billingAddress.lastName}}
          </div>
          <div>{{me.order.billingAddress.streetName}} {{me.order.billingAddress.streetNumber}}</div>
          <div>{{me.order.billingAddress.additionalStreetInfo}}</div>
          <div>{{me.order.billingAddress.city}}</div>
          <div>{{me.order.billingAddress.postalCode}} {{me.order.billingAddress.region}}</div>
          <div>{{me.order.billingAddress.country}}</div>
          <br>
          <div>{{me.order.billingAddress.contactInfo.phone}}</div>
          <div>{{me.order.billingAddress.contactInfo.email}}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">{{ $t('shippingMethod') }}</div>
          <div>
            {{me.order.shippingInfo.shippingMethod.name}}
            <span v-if="me.order.shippingInfo.shippingMethod.description">
              - {{me.order.shippingInfo.shippingMethod.description}}
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">{{ $t('paymentDetails') }}</div>
          <span v-if="me.order.paymentInfo">
            {{me.order.paymentInfo.payments[0].paymentMethodInfo.method}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {

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
        query orderByOrderNumber($orderNumber: String) {
          me {
            order(orderNumber: $orderNumber) {
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
              }
              paymentInfo {
                payments {
                  paymentMethodInfo {
                    method
                  }
                }
              }
            }
          }
        }`,
      variables() {
        return {
          orderNumber: this.orderNumber,
        };
      },
    },
  },
};
</script>

<i18n>
en:
  shippingAddress: "Shipping address"
  billingAddress: "Billing address"
  shippingMethod: "Shipping method"
  paymentDetails: "Payment details"
de:
  shippingAddress: "Lieferanschrift"
  billingAddress: "Rechnungsadresse"
  shippingMethod: "Versandart"
  paymentDetails: "Zahlungsdetails"
</i18n>
