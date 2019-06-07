<template>
  <div v-if="cartLike"
       class="cart-like-price-detail">
    <div class="row">
      <div class="col-sm-7 col-xs-7">
        <div class="text-right subtotal">
          <span class="subtotal-title">{{ $t('subtotal') }}</span>
        </div>
        <div class="text-right">
          <!--<div class="row">-->
          <!--<div class="col-lg-8 col-md-7 col-sm-7 col-xs-7">-->
          <!--<div class="text-right checkout-promo-code">-->
          <!--<span class="text-uppercase">{{ $t("checkout:promoCodeApplied") }}</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="col-lg-4 col-md-5 col-sm-5 col-xs-5">-->
          <!--<div class="text-right checkout-promo-code">-->
          <!--&lt;!&ndash;{{#each content.cart.discountCodes}}&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="text-uppercase">{{name}}</span><br>&ndash;&gt;-->
          <!--&lt;!&ndash;{{/each}}&ndash;&gt;-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
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
      <div class="col-sm-5 col-xs-5 text-right">
        <div>
          <span data-test="cart-subtotal-price">
            <BaseMoney :money="subtotal"/>
          </span>
        </div>
        <div>
          <!--<span class="order-discount">{{ cart.discount }}</span>-->
        </div>
        <div>
          <span v-if="cartLike.shippingInfo"
                data-test="cart-shipping-price">
            <BaseMoney :money="cartLike.shippingInfo.price"/>
          </span>
        </div>
        <hr>
        <div>
          <span v-if="taxes"
                data-test="cart-taxes-amount">>
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
  },
};
</script>

<i18n>
en:
  subtotal: "Subtotal"
  shipping: "Shipping"
  salesTax: "Sales Tax"
  total: "Total"
de:
  subtotal: "Zwischensumme"
  shipping: "Versand"
  salesTax: "MwSt."
  total: "Gesamtpreis"
</i18n>
