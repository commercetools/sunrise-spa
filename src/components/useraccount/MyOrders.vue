<template>
  <div class="my-orders col-sm-9" v-if="me">
      <!--{{> common/messages}}-->
      <!--<div class="my-account-title">
        <span class="my-account-title-text icon-user">{{i18n "my-account:myAccount.title"}}</span>
      </div>-->
                <div class="my-orders-content">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="my-orders-title hidden-xs">
                        <h4>{{$t ('myOrders')}}</h4>
                        <!--{{i18n "my-account:myOrders.title"}}-->
                      </div>
                    </div>
                  </div>
                  <div class="my-orders-table-wrapper">
                    <div class="row">
                      <div class="col-sm-2 col-xs-4">
                        <div class="my-orders-table-titles">
                          <!--{{i18n "my-account:myOrders.orderNumber"}}-->
                          <h5>{{$t ('orderNumber')}}</h5>
                        </div>
                      </div>
                      <div class="col-sm-2 hidden-xs">
                        <div class="my-orders-table-titles">
                          <!--{{i18n "my-account:myOrders.creationDate"}}-->
                          <h5>{{$t ('date')}}</h5>
                        </div>
                      </div>
                      <div class="col-sm-2 col-xs-4">
                        <div class="my-orders-table-titles">
                          <!--{{i18n "my-account:myOrders.totalPrice"}}-->
                          <h5>{{$t ('total')}}</h5>
                        </div>
                      </div>
                      <div class="col-sm-2 hidden-xs">
                        <div class="my-orders-table-titles">
                          <!--{{i18n "my-account:myOrders.paymentStatus"}}-->
                          <h5>{{$t ('paymentStatus')}}</h5>
                        </div>
                      </div>
                      <div class="col-sm-2 hidden-xs">
                        <div class="my-orders-table-titles">
                          <!--{{i18n "my-account:myOrders.shippingStatus"}}-->
                          <h5>{{$t ('shipmentStatus')}}</h5>
                        </div>
                      </div>
                       <div class="col-sm-2 col-xs-4">
                        <div class="my-orders-table-titles">
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                    <div v-for="order in me.orders.results" :key="order.id" class="my-orders-table-order">
                      <div class="row">
                        <div class="col-sm-2 col-xs-4">
                          <span>{{ order.orderNumber || "-" }}</span>
                        </div>
                        <div data-test="order-date"
                             class="col-sm-2 hidden-xs">
                          <span>{{ order.createdAt | formatDate }}</span>
                        </div>
                        <div data-test="total-price"
                             class="col-sm-2 col-xs-4">
                          <BaseMoney :money="order.totalPrice"/>
                        </div>
                        <div class="col-sm-2 hidden-xs">
                          <span>{{ order.paymentState || "-" }}</span>
                        </div>
                        <div class="col-sm-2 hidden-xs">
                          <span>{{ order.shipmentState || "-" }}</span>
                        </div>
                        <div class="col-sm-2 col-xs-4 text-right">
                        <!--<form id="form-view-my-order{{@index}}" name="view-my-order"
                              method="GET" action="{{showOrderUrl}}">
                            <button type="submit"
                              class="my-orders-view-order-btn">{{i18n "my-account:myOrders.view"}}</button>
                        </form>-->
                        </div>
                      </div>
                    </div>
                  <!--{{/each}}-->
                </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import moment from 'moment';
import BaseMoney from '../common/BaseMoney.vue';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  components: { BaseMoney },

  data: () => ({
    me: null,
  }),

  filters: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MMM DD, YYYY');
      } return null;
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
                taxedPrice {
                  totalGross {
                    type
                  }
                }
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

<!-- eslint-disable -->
<i18n>
  {
  "en": {
    "myOrders": "My Orders",
    "orderNumber": "Order Number",
    "date": "Date",
    "total": "Total",
    "paymentStatus": "Payment Status",
    "shipmentStatus": "Shipment Status"
  },
  "de": {
    "myOrders": "Meine Bestellungen",
    "orderNumber": "Bestellnummer",
    "date": "Datum",
    "total": "Gesamtpreis",
    "paymentStatus": "Zahlungsstatus",
    "shipmentStatus": "Versandstatus"
  }
}
</i18n>