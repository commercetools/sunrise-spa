<template>
  <div v-if="me && me.activeCart">
    <div class="row">
      <div class="col-sm-12">
        <div class="total-price-calc">
          <div class="row">
            <div class="col-sm-10 col-xs-7">
              <div class="text-right subtotal">
                <span class="subtotal-title">{{ $t('subtotal') }}</span>
              </div>
              <div class="text-right">
                <!--<span class="order-discount">{{ $t('checkout.orderDiscount') }}</span>-->
              </div>
              <div v-if="me.activeCart.shippingInfo"
                   class="text-right delivery-info">
                <span class="delivery-info-title">{{ $t('shipping') }}</span>
              </div>
              <hr class="total-divider">
              <div v-if="taxes"
                   class="text-right">
                <span>{{ $t('salesTax') }}</span>
              </div>
              <div class="text-right">
                <span class="order-total">{{ $t('total') }}</span>
              </div>
            </div>
            <div class="col-sm-2 col-xs-5 text-right">
              <div>
                <span data-test="cart-subtotal-price">
                  {{ formatPrice(subtotal) }}
                </span>
              </div>
              <div>
                <!--<span class="order-discount">{{ cart.discount }}</span>-->
              </div>
              <div>
                <span v-if="me.activeCart.shippingInfo">
                  {{ formatPrice(me.activeCart.shippingInfo.price) }}
                </span>
              </div>
              <hr>
              <div>
                <span v-if="taxes">
                  {{ formatPrice(taxes) }}
                </span>
              </div>
              <div>
                <span data-test="cart-total-price"
                      class="order-total">
                  {{ formatPrice(me.activeCart.totalPrice) }}
                </span>
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
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

export default {
  data: () => ({
    me: null,
  }),

  computed: {
    subtotal() {
      const { currencyCode, fractionDigits } = this.me.activeCart.totalPrice;
      return {
        centAmount: this.me.activeCart.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0),
        currencyCode,
        fractionDigits,
      };
    },

    taxes() {
      const { currencyCode, fractionDigits } = this.me.activeCart.totalPrice;
      const { taxedPrice } = this.me.activeCart;
      if (taxedPrice) {
        return {
          centAmount: taxedPrice.totalGross.centAmount - taxedPrice.totalNet.centAmount,
          currencyCode,
          fractionDigits,
        };
      }
      return null;
    },
  },

  mixins: [priceMixin],

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            activeCart {
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
        ${DisplayableMoneyFragment}`,
    },
  },
};
</script>

<i18n>
{
  "en": {
    "subtotal": "Subtotal",
    "shipping": "Shipping",
    "salesTax": "Sales Tax",
    "total": "Total"
  },
  "de": {
    "subtotal": "Zwischensumme",
    "shipping": "Versand",
    "salesTax": "MwSt.",
    "total": "Gesamtpreis"
  }
}
</i18n>
