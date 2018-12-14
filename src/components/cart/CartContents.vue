<template>
  <div v-if="me && cart">
    <div class="row">
      <div class="row text-uppercase hidden-xs cart-items-title">
        <div class="col-sm-6">
          <span>{{ $t('main.common.description') }}</span>
        </div>
        <div :class="!editable ? 'text-center' : ''"
             class="col-sm-2">
          <span>{{ $t('main.common.quantity') }}</span>
        </div>
        <div class="col-sm-2 text-right">
          <span>{{ $t('main.common.price') }}</span>
        </div>
        <div class="col-sm-2 text-right">
          <span>{{ $t('checkout.total') }}</span>
        </div>
      </div>
    </div>
    <LineItem v-for="lineItem in cart.lineItems"
              :lineItem="lineItem"
              :cartId="cart.id"
              :cartVersion="cart.version"
              :key="lineItem.id"
              :editable="editable"
              class="row single-cart-item"/>
    <!--{{> checkout/order-summary/discount-code-input}}-->
    <!--{{> checkout/order-summary/discount-summary}}-->
    <!--{{#if checkoutConfirmation}}-->
    <!--{{> checkout/order-summary/confirmation-checkboxes}}-->
    <!--{{/if}}-->
  </div>
</template>

<script>
import gql from 'graphql-tag';
import priceMixin from '@/mixins/priceMixin';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.graphql';
import LineItem from './LineItem.vue';

export default {
  components: { LineItem },

  props: {
    editable: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    cart: vm => vm.me.carts.results[0],
  },

  mixins: [priceMixin],

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            carts(limit: 1) {
              results {
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
{
  "en": {
  },
  "de": {
  }
}
</i18n>
