<template>
  <div v-if="me && me.activeCart">
    <div class="order-summary">
      <span class="text-uppercase order-summary-title">{{ $t("orderSummary") }}:</span>
      <span class="checkout-total-items">
        {{ $tc('itemsTotal', totalItems) }}
      </span>
    </div>
    <div class="checkout-order">
      <VuePerfectScrollbar>
        <div class="order-summary-items">
          <div v-for="lineItem in sortedLineItems"
               :key="lineItem.id"
               class="order-summary-item">
            <LineItemInfo :line-item="lineItem"
                          class="line-item-info"/>
            <div class="order-item-price">
              <div class="row">
                <div class="col-xs-3">
                  <div class="text-right">
                    <span class="text-uppercase pricing-titles">{{ $t("quantity") }}</span>
                    <br>
                    <span>{{ lineItem.quantity }}</span>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="text-right order-item-value">
                    <span class="text-uppercase pricing-titles">{{ $t("price") }}</span>
                    <br>
                    <BasePrice :price="lineItem.price"/>
                  </div>
                </div>
                <div class="col-xs-5">
                  <div class="text-right order-item-value">
                    <span class="text-uppercase pricing-titles">{{ $t("total") }}</span>
                    <br>
                    <BaseMoney :money="lineItem.totalPrice"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
      <CartLikePriceDetail :cart-like="me.activeCart"
                           :editable="true"/>
      <div class="row">
        <span class="text-uppercase pull-right edit-quantity-order">
          <router-link :to="{ name: 'cart' }">{{ $t("editMyCart") }}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import BasePrice from '../common/BasePrice.vue';
import BaseMoney from '../common/BaseMoney.vue';
import productMixin from '../../mixins/productMixin';
import cartMixin from '../../mixins/cartMixin';
import CartLikePriceDetail from '../common/cartlike/CartLikePriceDetail.vue';
import LineItemInfo from '../common/cartlike/LineItemInfo.vue';
import CART_FRAGMENT from '../Cart.gql';
import MONEY_FRAGMENT from '../Money.gql';
import ADDRESS_FRAGMENT from '../Address.gql';

export default {
  components: {
    LineItemInfo,
    CartLikePriceDetail,
    BasePrice,
    BaseMoney,
    VuePerfectScrollbar,
  },

  mixins: [productMixin, cartMixin],

  data: () => ({
    me: null,
  }),

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            activeCart {
              ...CartFields
            }
          }
        }
        ${CART_FRAGMENT}
        ${MONEY_FRAGMENT}
        ${ADDRESS_FRAGMENT}`,
      variables() {
        return {
          locale: this.$i18n.locale,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.line-item-info {
  float: left;
}
</style>

<i18n>
  en:
    itemsTotal: "{n} item in total | {n} items in total"
    editMyCart: "Edit my shopping cart"
    orderSummary: "Order Summary"
    quantity: "Quantity"
    price: "Price"
    total: "Total"
  de:
    itemsTotal: "{n} Artikel im Warenkorb"
    editMyCart: "Warenkorb bearbeiten"
    orderSummary: "Bestellübersicht"
    quantity: "Menge"
    price: "Preis"
    total: "Gesamtpreis"
</i18n>
