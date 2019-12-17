<template>
  <li @mouseleave="close"
      @mouseenter="open"
      class="list-item-bag">
    <router-link :to=" { name: 'cart' }"
                 data-test="mini-cart-open-button"
                 class="not-empty link-your-bag icon-hand-bag">
      <span class="hidden-xs hidden-sm">{{ $t('miniCart') }}</span>
      <span class="cart-item-number">{{ totalItems }}</span>
    </router-link>
    <transition name="fade">
      <div v-show="show"
           v-if="totalItems"
           class="nav-minicart"
           data-test="mini-cart-content">
        <VuePerfectScrollbar>
          <ul>
            <li v-for="lineItem in sortedLineItems"
                :key="lineItem.id"
                data-test="mini-cart-line-item">
              <div>
                <LineItemInfo :line-item="lineItem"
                              :extended="false" />
                <div class="details">
                  <p class="product-quantity">
                    {{ $t('quantity') }}
                    <span data-test="cart-line-item-quantity">
                      {{ lineItem.quantity }}
                    </span>
                  </p>
                  <p class="product-price">
                    {{ $t('price') }}
                    <span data-test="cart-line-item-price">
                      <BaseMoney :money="lineItem.totalPrice"/>
                    </span>
                  </p>
                  <LineItemDeleteForm :lineItemId="lineItem.id"/>
                </div>
              </div>
            </li>
          </ul>
        </VuePerfectScrollbar>
        <div class="gradient"></div>
        <p class="total-price"
           data-test="mini-cart-price">
          {{ $t('totalPrice') }}
          <BaseMoney :money="me.activeCart.totalPrice"/>
        </p>
        <router-link :to="{ name: 'cart' }"
                     @click.native="toggle"
                     class="btn-grey">
          {{ $t('viewBag') }}
        </router-link>
        <router-link :to="{ name: 'checkout' }"
                     @click.native="toggle"
                     class="btn-yellow">{{ $t('checkout') }}</router-link>
      </div>
    </transition>
  </li>
</template>

<script>
import Vue from 'vue';
import gql from 'graphql-tag';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import cartMixin from '../../mixins/cartMixin';
import productMixin from '../../mixins/productMixin';
import BaseMoney from '../common/BaseMoney.vue';
import LineItemInfo from '../common/cartlike/LineItemInfo.vue';
import LineItemDeleteForm from '../cartdetail/LineItemDeleteForm.vue';
import MONEY_FRAGMENT from '../Money.gql';

export default {
  components: {
    LineItemDeleteForm,
    LineItemInfo,
    BaseMoney,
    VuePerfectScrollbar,
  },

  mixins: [cartMixin, productMixin],

  data: () => ({
    me: null,
  }),

  computed: {
    show() {
      return this.$store.state.miniCartOpen;
    },
  },

  methods: {
    open() {
      this.$store.dispatch('openMiniCart', 0);
    },

    close() {
      this.$store.dispatch('closeMiniCart', 300);
    },
  },

  watch: {
    show(newValue, oldValue) {
      if (newValue && !oldValue) {
        Vue.nextTick(() => $('.nav-minicart section').scrollTop(0));
      }
    },
  },

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            activeCart {
              id
              lineItems {
                id
                quantity
                name(locale: $locale)
                productSlug(locale: $locale)
                variant {
                  sku
                  images {
                    url
                  }
                }
                totalPrice {
                  ...MoneyFields
                }
              }
              totalPrice {
                ...MoneyFields
              }
            }
          }
        }
        ${MONEY_FRAGMENT}`,
      variables() {
        return {
          locale: this.$store.state.locale,
        };
      },
    },
  },
};
</script>

<style>
.nav-minicart .delete-text {
  display: none;
}
</style>

<i18n>
  de:
    miniCart: "Warenkorb"
    viewBag: "Warenkorb"
    quantity: "Menge"
    price: "Price"
    totalPrice: "Gesamtpreis"
    delete: "Löschen"
    checkout: "Checkout"
  en:
    miniCart: "Cart"
    viewBag: "View Bag"
    quantity: "quantity"
    price: "Price"
    totalPrice: "Total"
    delete: "Delete"
    checkout: "Checkout"
</i18n>
