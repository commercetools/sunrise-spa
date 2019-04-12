<template>
  <div v-if="cartLike">
    <div class="row">
      <div class="col-sm-12">
          <div class="row">
            <div class="col-sm-10 col-xs-7">
              <div class="text-right subtotal">
                <span class="subtotal-title">{{ $t('subtotal') }}</span>
              </div>
              <div v-if="discount.relativeDiscount || discount.absoluteDiscount" class="text-right">
                <span class="order-discount">{{ $t('discount') }}</span>
              </div>
              <div v-if="discount.relativeDiscount && discount.absoluteDiscount">
                &nbsp;
              </div>
              <div v-if="cartLike.shippingInfo"
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
                  <BaseMoney :money="subtotal"/>
                </span>
              </div>
              <div class="order-discount"
                   data-test="discount-value">
                <div v-if="discount.relativeDiscount">
                  - {{discount.relativeDiscount}} %
                </div>
                <div v-if="discount.absoluteDiscount">
                  - <BaseMoney :money="discount.absoluteDiscount"/>
                </div>
              </div>
              <div>
                <span v-if="cartLike.shippingInfo">
                  <BaseMoney :money="cartLike.shippingInfo.price"/>
                </span>
              </div>
              <hr>
              <div>
                <span v-if="taxes">
                  <BaseMoney :money="taxes"/>
                </span>
              </div>
              <div>
                <span data-test="cart-total-price"
                      class="order-total">
                  <BaseMoney :money="cartLike.totalPrice"/>
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
</template>

<script>
import BaseMoney from './BaseMoney.vue';

export default {
  components: {
    BaseMoney,
  },

  props: {
    cartLike: {
      type: Object,
      required: true,
    },
  },

  computed: {
    subtotal() {
      const { currencyCode, fractionDigits } = this.cartLike.totalPrice;
      return {
        centAmount: this.cartLike.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0),
        currencyCode,
        fractionDigits,
      };
    },

    taxes() {
      const { currencyCode, fractionDigits } = this.cartLike.totalPrice;
      const { taxedPrice } = this.cartLike;
      if (taxedPrice) {
        return {
          centAmount: taxedPrice.totalGross.centAmount - taxedPrice.totalNet.centAmount,
          currencyCode,
          fractionDigits,
        };
      }
      return null;
    },

    discount() {
      let relativeDiscount = null;
      let absoluteDiscount = null;
      if (this.cartLike.discountCodes) {
        this.cartLike.discountCodes.forEach((e) => {
          e.discountCode.cartDiscounts.forEach((code) => {
            // eslint-disable-next-line
            if (code.value.__typename === 'RelativeDiscountValue') {
              relativeDiscount = code.value.permyriad * 0.01;
              // eslint-disable-next-line
            } else if (code.value.__typename === 'AbsoluteDiscountValue') {
              // eslint-disable-next-line
              absoluteDiscount = code.value.money[0];
            }
          });
        });
      }
      return { relativeDiscount, absoluteDiscount };
    },
  },
};
</script>

<i18n>
en:
  subtotal: "Subtotal"
  shipping: "Shipping"
  salesTax: "Sales Tax"
  total: "Total"
  discount: "Discount"
de:
  subtotal: "Zwischensumme"
  shipping: "Versand"
  salesTax: "MwSt."
  total: "Gesamtpreis"
  discount: "Rabatt"
</i18n>
