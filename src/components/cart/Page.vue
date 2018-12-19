<template>
  <div class="cart-page">
    <div v-if="me && me.activeCart"
         class="container">
      <div class="row">
        <div class="col-sm-8 col-xs-12">
          <div class="current-in-bag">
            <span>
              <img class="bag-icon-lg" src="../../assets/img/hand-bag-2-black.png" alt="bag icon">
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
          <div class="cart-content">
            <CartContent :editable="true"/>
            <PriceCalculation/>
          </div>
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
    <div v-else>
      {{ $t('empty') }}
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import CartContent from '@/components/cart/CartContent.vue';
import PriceCalculation from '@/components/cart/PriceCalculation.vue';

export default {
  components: { CartContent, PriceCalculation },
  data: () => ({
    me: null,
  }),

  computed: {
    totalItems: vm => vm.me.activeCart.lineItems.reduce((acc, li) => acc + li.quantity, 0),
  },

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
{
  "en": {
    "yourBag": "Your Bag",
    "itemsTotal": "{n} item in total | {n} items in total",
    "empty": "Your bag is empty :("
  },
  "de": {
    "yourBag": "Ihr Einkaufswagen",
    "itemsTotal": "{n} Artikel im Warenkorb",
    "empty": "Ihr Einkaufswagen ist leer :("
  }
}
</i18n>
