<template>
  <div v-if="me">
    <div class="row">
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">{{ $t('shippingAddress') }}</div>
          <BaseAddress v-if="me.order.shippingAddress"
                       :address="me.order.shippingAddress"/>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">{{ $t('billingAddress') }}</div>
          <BaseAddress v-if="me.order.billingAddress"
                       :address="me.order.billingAddress"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="my-orders-order-dark-box">
          <div class="my-orders-order-dark-box-title">{{ $t('shippingMethod') }}</div>
          <div>
            {{ me.order.shippingInfo.shippingMethod.name }}
            <span v-if=" me.order.shippingInfo.shippingMethod.description">
              - {{ me.order.shippingInfo.shippingMethod.description }}
            </span>
          </div>
        </div>
      </div>
        <div class="col-sm-6">
          <div class="my-orders-order-dark-box">
            <div class="my-orders-order-dark-box-title">{{ $t('paymentDetails') }}</div>
              <div v-if="me.order.paymentInfo">
                <span v-for="payment in me.order.paymentInfo.payments"
                      :key="payment.id">
                  {{ payment.paymentMethodInfo.method }}
                </span>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag';
import BaseAddress from '../../common/BaseAddress.vue';

export default {

  components: { BaseAddress },

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
              id
              version
              orderNumber
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
  paymentDetails: "Zahlungsdetails"
  shippingMethod: "Versandart"
  shippingAddress: "Lieferanschrift"
  billingAddress: "Rechnungsadresse"
</i18n>
