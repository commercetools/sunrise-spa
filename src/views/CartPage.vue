<template>
  <div class="cart-page">
    <div v-if="me && cart"
         class="container">
      <div class="row">
        <div class="col-sm-8 col-xs-12">
          <div class="current-in-bag">
            <span>
              <img class="bag-icon-lg" src="../assets/img/hand-bag-2-black.png" alt="bag icon">
            </span>
            <span class="text-uppercase your-bag-txt">{{ $t('yourBag') }}: </span>
            <span class="items-total-txt">{{ $tc('itemsTotal', totalItems) }}</span>
          </div>
        </div>
        <div class="col-sm-4">
          <!--{{> checkout/start-checkout-link id="cart-checkoutnow-btn"}}-->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <CartSummary :editable="true"
                       class="cart-content"/>
          <!--{{> checkout/order-summary cart=content.cart mainClass="cart-content" editable=true}}-->
        </div>
      </div>
      <div class="row bottom-cart-btns">
        <div class="col-sm-6">
          <!--{{> checkout/continue-shopping-button-left}}-->
        </div>
        <div class="col-sm-6">
          <!--{{> checkout/start-checkout-link bottom=true}}-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import CartSummary from '@/components/CartSummary.vue';

export default {
  components: { CartSummary },
  data: () => ({
    me: null,
  }),

  computed: {
    cart: vm => vm.me.carts.results[0],

    totalItems: vm => vm.cart.lineItems.reduce((acc, li) => acc + li.quantity, 0),
  },

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            carts(limit: 1) {
              results {
                id
                lineItems {
                  id
                  quantity
                }
              }
            }
          }
        }`,
    },
  },
};
</script>

<i18n>
{
  "en": {
    "yourBag": "Your Bag",
    "itemsTotal": "{n} item in total | {n} items in total"
  },
  "de": {
    "yourBag": "Ihr Einkaufswagen",
    "itemsTotal": "{n} Artikel im Warenkorb"
  }
}
</i18n>
