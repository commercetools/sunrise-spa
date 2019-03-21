<template>
  <div class="col-sm-9">
    <div v-if="me"
         class="my-orders col-sm-12">
      <div class="my-orders-content">
        <div class="row">
          <div class="col-sm-12">
            <div class="my-orders-title hidden-xs">
              <h4>{{ $t('myOrders')}}</h4>
            </div>
          </div>
        </div>
        <div class="my-orders-table-wrapper">
          <div class="row">
            <div class="col-sm-2 col-xs-4">
              <div class="my-orders-table-titles">
                <h5>{{ $t('orderNumber')}}</h5>
              </div>
            </div>
            <div class="col-sm-2 hidden-xs">
              <div class="my-orders-table-titles">
                <h5>{{ $t('date')}}</h5>
              </div>
            </div>
            <div class="col-sm-2 col-xs-4">
              <div class="my-orders-table-titles">
                <h5>{{ $t('total')}}</h5>
              </div>
            </div>
            <div class="col-sm-2 hidden-xs">
              <div class="my-orders-table-titles">
                <h5>{{ $t('paymentStatus')}}</h5>
              </div>
            </div>
            <div class="col-sm-2 hidden-xs">
              <div class="my-orders-table-titles">
                <h5>{{ $t('shipmentStatus')}}</h5>
              </div>
            </div>
            <div class="col-sm-2 col-xs-4">
              <div class="my-orders-table-titles">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
        <div v-for="order in me.orders.results"
             :key="order.id"
             data-test="order-list"
             class="my-orders-table-order">
          <div class="row">
            <div class="col-sm-2 col-xs-4" >
              <span data-test="order-number">
                {{ order.orderNumber || "-" }}
                </span>
            </div>
            <div data-test="order-date"
                 class="col-sm-2 hidden-xs">
              <BaseDate :date="order.createdAt"
                        :format="'short'"/>
            </div>
            <div data-test="total-price"
                 class="col-sm-2 col-xs-4">
              <BaseMoney :money="order.totalPrice"/>
            </div>
            <div class="col-sm-2 hidden-xs"
                 data-test="payment-state">
              <span>{{ translateStatus(order.paymentState) }}</span>
            </div>
            <div class="col-sm-2 hidden-xs"
                 data-test="shipment-state">
              <span>{{ translateStatus(order.shipmentState) }}</span>
            </div>
            <div class="col-sm-2 col-xs-4 text-right">
              <router-link :to="{ name: 'order', params: { orderNumber: order.orderNumber } }">
                <button class="my-orders-view-order-btn"
                        data-test="view-order-btn">
                  {{ $t('view') }}
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BaseMoney from '../common/BaseMoney.vue';
import BaseDate from '../common/BaseDate.vue';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  components: { BaseMoney, BaseDate },

  data: () => ({
    me: null,
  }),

  methods: {
    translateStatus(state) {
      return state ? this.$t(state) : '-';
    },
  },

  apollo: {
    me: {
      query: gql`
        query MyOrders {
          me {
            orders {
              results {
                id
                orderNumber
                totalPrice {
                  ...DisplayableMoney
                }
                createdAt
                shipmentState
                paymentState
              }
            }
          }
        },
        ${DisplayableMoneyFragment}`,
    },
  },
};
</script>

<i18n>
en:
  myOrders: "My Orders"
  orderNumber: "Order Number"
  date: "Date"
  total: "Total"
  paymentStatus: "Payment Status"
  shipmentStatus: "Shipment Status"
  Shipped: "Shipped"
  Ready: "Ready"
  Pending: "Pending"
  Delayed: "Delayed"
  Partial: "Partial"
  Backorder: "Backorder"
  BalanceDue: "Balance Due"
  Failed: "Failed"
  CreditOwed: "Credit Owed"
  Paid: "Paid"
  view: "View"
de:
  myOrders: "Meine Bestellungen"
  orderNumber: "Bestellnummer"
  date: "Datum"
  total: "Gesamtpreis"
  paymentStatus: "Zahlungsstatus"
  shipmentStatus: "Versandstatus"
  Shipped: "Versandt"
  Ready: "Bereit"
  Pending: "Anstehend"
  Delayed: "Verspätet"
  Partial: "Teilweise"
  Backorder: "Lieferrückstand"
  BalanceDue: "Rechnungsbetrag"
  Failed: "Fehlgeschlagen"
  CreditOwed: "Kreditforderung"
  Paid: "Bezahlt"
  view: "Ansehen"
</i18n>
