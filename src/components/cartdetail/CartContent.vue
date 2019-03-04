<template>
  <div v-if="me && me.activeCart">
    <div class="row">
      <div class="row text-uppercase hidden-xs cart-items-title">
        <div class="col-sm-6">
          <span>{{ $t('description') }}</span>
        </div>
        <div :class="!editable ? 'text-center' : ''"
             class="col-sm-2">
          <span>{{ $t('quantity') }}</span>
        </div>
        <div class="col-sm-2 text-right">
          <span>{{ $t('price') }}</span>
        </div>
        <div class="col-sm-2 text-right">
          <span>{{ $t('total') }}</span>
        </div>
      </div>
    </div>
    <LineItem v-for="lineItem in me.activeCart.lineItems"
              :key="lineItem.id"
              :lineItem="lineItem"
              :editable="editable"
              @removeLineItem="removeLineItem"
              @changeLineItemQuantity="changeLineItemQuantity"/>
    <!--{{> checkout/order-summary/discount-code-input}}-->
    <!--{{> checkout/order-summary/discount-summary}}-->
    <!--{{#if checkoutConfirmation}}-->
    <!--{{> checkout/order-summary/confirmation-checkboxes}}-->
    <!--{{/if}}-->
  </div>
</template>

<script>
import gql from 'graphql-tag';
import cartMixin from '@/mixins/cartMixin';
import priceMixin from '@/mixins/priceMixin';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';
import LineItem from './LineItem.vue';

export default {
  components: { LineItem },

  props: {
    editable: {
      type: Boolean,
      default: () => false,
    },
  },

  data: () => ({
    me: null,
  }),

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
  description: "Description"
  quantity: "Quantity"
  price: "Price"
  total: "Total"
de:
  description: "Beschreibung"
  quantity: "Menge"
  price: "Preis"
  total: "Gesamtpreis"
</i18n>
