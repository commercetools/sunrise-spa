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
        <MainDetails/>
        <PriceCalculation/>
        <LineItems/>
        <div class="order-print-receipt-btn-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BaseDate from '../../common/BaseDate.vue';
import MainDetails from './MainDetails.vue';
import PriceCalculation from './PriceCalculation.vue';
import LineItems from './LineItems.vue';

export default {
  components: {
    BaseDate,
    MainDetails,
    PriceCalculation,
    LineItems,
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
        query orderByOrderNumber($orderNumber: String) {
          me {
            order(orderNumber: $orderNumber) {
              version
              orderNumber
              createdAt
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
