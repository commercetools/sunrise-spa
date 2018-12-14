<template>
  <div v-if="me && cart">
    <div class="row">
      <div class="col-sm-12">
        <div class="total-price-calc">
          <div class="row">
            <div class="col-sm-10 col-xs-7">
              <div class="text-right subtotal">
                <span class="subtotal-title">{{ $t('checkout.subtotal') }}</span>
              </div>
              <div class="text-right">
                <!--<span class="order-discount">{{ $t('checkout.orderDiscount') }}</span>-->
              </div>
              <div v-if="cart.shippingInfo"
                   class="text-right delivery-info">
                <span class="delivery-info-title">{{ $t('checkout.shipping') }}</span>
              </div>
              <hr class="total-divider">
              <div v-if="cart.taxedPrice"
                   class="text-right">
                <span>{{ $t('main.common.salesTax') }}</span>
              </div>
              <div class="text-right">
                <span class="order-total">{{ $t('checkout.total') }}</span>
              </div>
            </div>
            <div class="col-sm-2 col-xs-5 text-right">
              <div>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div>
                <!--<span class="order-discount">{{ cart.discount }}</span>-->
              </div>
              <div>
                <span v-if="cart.shippingInfo">{{ formatPrice(cart.shippingInfo.price) }}</span>
              </div>
              <hr>
              <div>
                <span v-if="cart.taxedPrice">{{ cart.salesTax }}</span>
              </div>
              <div>
                <span class="order-total">{{ formatPrice(cart.totalPrice) }}</span>
              </div>
            </div>

            <!--{{#if checkoutConfirmation}}-->
            <!--<div class="complete-order">-->
              <!--<button id="confirmation-completeorder-btn"-->
                      <!--class="btn complete-order-btn">{{ $t('checkout.completeMyOrder') }}</button>-->
              <!--<br>-->
            <!--</div>-->
            <!--{{/if}}-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import priceMixin from '@/mixins/priceMixin';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.graphql';

export default {
  computed: {
    cart: vm => vm.me.carts.results[0],

    subtotal() {
      const { currencyCode, fractionDigits } = this.cart.totalPrice;
      return {
        centAmount: this.cart.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0),
        currencyCode,
        fractionDigits,
      };
    },

    taxes() {
      const { currencyCode, fractionDigits } = this.cart.totalPrice;
      return {
        centAmount: this.cart.taxedPrice.totalGross.centAmount - this.cart.taxedPrice.totalNet.centAmount,
        currencyCode,
        fractionDigits,
      };
    },
  },

  mixins: [priceMixin],

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
                  totalPrice {
                    ...DisplayableMoney
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
        }
        ${DisplayableMoneyFragment}`,
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
