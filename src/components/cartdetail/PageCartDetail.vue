<template>
  <div class="cart-page container">
    <div class="row">
      <div class="col-sm-8 col-xs-12">
        <div class="current-in-bag">
          <span>
            <img class="bag-icon-lg" src="../../assets/img/hand-bag-2-black.png" alt="bag icon">
          </span>
          <span class="text-uppercase your-bag-txt">{{ $t('yourBag') }}: </span>
          <span class="items-total-txt"
                data-test="cart-total-items">
            {{ $tc('itemsTotal', totalItems) }}
          </span>
        </div>
      </div>
      <div class="col-sm-4">
        <!--{{> checkout/start-checkout-link id="cart-checkoutnow-btn"}}-->
      </div>
    </div>
    <div v-if="me && me.activeCart">
      <div class="row">
        <div class="col-sm-12">
          <div class="cart-content">
            <CartContent :editable="true"/>
            <PriceCalculation/>
          </div>
        </div>
      </div>
      <div class="row bottom-cart-btns">
        <div class="col-sm-6">
          <router-link to="/"
             class="text-uppercase continue-shopping-btn">
            {{ $t('continueShopping') }}
          </router-link>
        </div>
        <div class="col-sm-6">
          <!--{{> checkout/start-checkout-link bottom=true}}-->
        </div>
      </div>
    </div>
    <div v-else>
      {{ $t('empty') }}
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import cartMixin from '@/mixins/cartMixin';
import CartContent from '@/components/cartdetail/CartContent.vue';
import PriceCalculation from '@/components/cartdetail/PriceCalculation.vue';

export default {
  components: { CartContent, PriceCalculation },

  data: () => ({
    me: null,
  }),

  mixins: [cartMixin],

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            activeCart {
              id
              lineItems {
                id
                quantity
              }
            }
          }
        }`,
    },
  },
};
</script>

<i18n>
en:
  yourBag: "Your Bag"
  itemsTotal: "{n} item in total | {n} items in total"
  empty: "Your bag is empty"
  continueShopping: "Continue Shopping"
de:
  yourBag: "Ihr Einkaufswagen"
  itemsTotal: "{n} Artikel im Warenkorb"
  empty: "Ihr Einkaufswagen ist leer :("
  continueShopping: "Weiter einkaufen"
</i18n>
