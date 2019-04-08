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
    <div v-if="notEmpty">
      <div class="row">
        <div class="col-sm-12">
          <div class="cart-content">
            <CartLikeSummary :cart-like="me.activeCart">
              <template #quantity-column="{ lineItem }">
                <LineItemDeleteForm :line-item="lineItem"
                                    @submit="removeLineItem"
                                    class="col-sm-6 col-xs-12 cart-edit-delete"/>
                <LineItemQuantityForm :line-item="lineItem"
                                      @submit="changeLineItemQuantity"
                                      class="col-sm-6 col-xs-12 clearfix sm-pull-right"/>
              </template>
            </CartLikeSummary>
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
import CartLikeSummary from '../common/CartLikeSummary.vue';
import LineItemDeleteForm from './LineItemDeleteForm.vue';
import LineItemQuantityForm from './LineItemQuantityForm.vue';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  components: {
    LineItemQuantityForm,
    LineItemDeleteForm,
    CartLikeSummary,
  },

  data: () => ({
    me: null,
  }),

  mixins: [cartMixin],

  computed: {
    notEmpty() {
      return this.me && this.me.activeCart && this.me.activeCart.lineItems.length > 0;
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

    changeLineItemQuantity(lineItemId, quantity) {
      return this.updateMyCart([
        {
          changeLineItemQuantity: {
            lineItemId,
            quantity,
          },
        },
      ]);
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
                name(locale: $locale)
                productSlug(locale: $locale)
                quantity
                price {
                  value {
                    ...DisplayableMoney
                  }
                  discounted {
                    value {
                      ...DisplayableMoney
                    }
                  }
                }
                totalPrice {
                  ...DisplayableMoney
                }
                variant {
                  sku
                  images {
                    url
                  }
                }
              }
              totalPrice {
               ...DisplayableMoney
              }
              shippingInfo {
                price {
                  ...DisplayableMoney
                }
              }
              taxedPrice {
                totalGross {
                  ...DisplayableMoney
                }
                totalNet {
                  ...DisplayableMoney
                }
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
