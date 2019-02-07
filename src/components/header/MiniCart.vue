<template>
  <li @mouseleave="close"
      @mouseenter="open"
      class="list-item-bag">
    <button @click="toggle"
            class="not-empty link-your-bag icon-hand-bag">
      <span class="hidden-xs hidden-sm">{{ $t('miniCart') }}</span>
      <span class="cart-item-number">{{ totalItems }}</span>
    </button>
    <div v-if="me && me.activeCart && totalItems"
         class="col-xs-12">
      <transition name="fade">
        <div v-show="show"
             class="nav-minicart">
          <VuePerfectScrollbar>
            <ul>
              <li v-for="lineItem in sortedLineItems"
                  :key="lineItem.id">
                <div>
                  <router-link :to="{
                    name: 'product',
                    params: { productSlug: lineItem.productSlug, sku: lineItem.variant.sku }}"
                    class="img">
                    <img :src="lineItem.variant.images[0].url"
                         :alt="lineItem.name"
                         class="img"/>
                  </router-link>
                  <router-link :to="{
                    name: 'product',
                    params: { productSlug: lineItem.productSlug, sku: lineItem.variant.sku }}">
                    <p class="product-title">{{ lineItem.name }}</p>
                  </router-link>
                  <div class="details">
                    <p class="product-quantity">
                      {{ $t('quantity') }}
                      <span>{{ lineItem.quantity }}</span>
                    </p>
                    <p class="product-price">
                      {{ $t('price') }}
                      <span>{{ formatPrice(lineItem.totalPrice) }}</span>
                    </p>
                    <button @click="removeLineItem(lineItem.id)"
                            class="delete">
                        <span>
                          <img src="../../assets/img/delete-1.png"
                               class="cart-action-icon"
                               :alt="$t('delete')"/>
                        </span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </VuePerfectScrollbar>
          <div class="gradient"></div>
          <p class="total-price">
            {{ $t('totalPrice', { totalPrice: formatPrice(me.activeCart.totalPrice) }) }}
          </p>
          <router-link :to="{ name: 'cart' }"
                       class="btn-grey">
            {{ $t('viewBag') }}
          </router-link>
          <router-link :to="{ name: 'cart' }"
                       class="btn-yellow">{{ $t('checkout') }}</router-link>
        </div>
      </transition>
    </div>
  </li>
</template>

<script>
import Vue from 'vue';
import gql from 'graphql-tag';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import cartMixin from '@/mixins/cartMixin';
import priceMixin from '@/mixins/priceMixin';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  components: {
    VuePerfectScrollbar,
  },

  data: () => ({
    me: null,
  }),

  computed: {
    show() {
      return this.$store.state.miniCartOpen;
    },

    sortedLineItems() {
      const { lineItems } = this.me.activeCart;
      return lineItems.reverse();
    },

    totalItems() {
      if (this.me && this.me.activeCart) {
        return this.me.activeCart.lineItems.reduce((acc, li) => acc + li.quantity, 0);
      }
      return 0;
    },
  },

  methods: {
    removeLineItem(lineItemId) {
      return this.updateMyCart([
        {
          removeLineItem: {
            lineItemId,
          },
        },
      ]);
    },

    toggle() {
      this.$store.dispatch('toggleMiniCart');
    },

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

  mixins: [cartMixin, priceMixin],

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            activeCart {
              id
              version
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
                  ...DisplayableMoney
                }
              }
              totalPrice {
                ...DisplayableMoney
              }
            }
          }
        }
        ${DisplayableMoneyFragment}`,
      variables() {
        return {
          locale: this.$i18n.locale,
        };
      },
    },
  },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "de": {
    "miniCart": "Warenkorb",
    "viewBag": "Warenkorb",
    "quantity": "Menge",
    "price": "Price",
    "totalPrice": "Gesamtpreis {totalPrice}",
    "delete": "Löschen",
    "checkout": "Checkout"
  },
  "en": {
    "miniCart": "Cart",
    "viewBag": "View Bag",
    "quantity": "quantity",
    "price": "Price",
    "totalPrice": "Total {totalPrice}",
    "delete": "Delete",
    "checkout": "Checkout"
  }
}
</i18n>
