<template>
  <li @mouseleave="close"
      @mouseenter="open"
      class="list-item-bag">
    <button @click="toggle"
            data-test="mini-cart-open-button"
            class="not-empty link-your-bag icon-hand-bag">
      <span class="hidden-xs hidden-sm">{{ $t('miniCart') }}</span>
      <span class="cart-item-number">{{ totalItems }}</span>
    </button>
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
                <router-link :to="{
                  name: 'product',
                  params: { productSlug: lineItem.productSlug, sku: lineItem.variant.sku }}"
                  class="img">
                  <img :src="imageUrl"
                       :alt="lineItem.name"
                       class="img"/>
                </router-link>
                <router-link data-test="mini-cart-line-item-link"
                             :to="{
                             name: 'product',
                             params: { productSlug: lineItem.productSlug, sku: lineItem.variant.sku }}">
                  <p class="product-title">
                    {{ lineItem.name }}
                  </p>
                </router-link>
                <div class="details">
                  <p class="product-quantity">
                    {{ $t('quantity') }}
                    <span data-test="mini-cart-line-item-quantity">
                      {{ lineItem.quantity }}
                    </span>
                  </p>
                  <p class="product-price">
                    {{ $t('price') }}
                    <span data-test="mini-cart-line-item-price">
                      {{ formatPrice(lineItem.totalPrice) }}
                    </span>
                  </p>
                  <button @click="removeLineItem(lineItem.id)"
                          data-test="mini-cart-line-item-delete"
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
        <p class="total-price"
           data-test="mini-cart-price">
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

  mixins: [cartMixin, priceMixin],

  data: () => ({
    me: null,
  }),

  computed: {
    show() {
      return this.$store.state.miniCartOpen;
    },

    sortedLineItems() {
      if (this.me && this.me.activeCart) {
        const { lineItems } = this.me.activeCart;
        return lineItems.reverse();
      }
      return [];
    },
  },

  methods: {
    imageUrl(lineItem) {
      const { images } = lineItem.variant;
      if (Array.isArray(images) && images.length) {
        return lineItem.variant.images[0].url;
      }
      return null;
    },

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
