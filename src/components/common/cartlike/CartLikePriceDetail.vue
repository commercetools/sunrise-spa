<template>
  <div v-if="cartLike"
       class="cart-like-price-detail">
    <div v-if="discountCodesExist"
         class="row">
      <DiscountCodes :cartLike="cartLike"
                     :editable="editable"
                     class="col-sm-12"/>
    </div>
    <hr v-if="discountCodesExist">
    <div class="row">
      <div class="col-sm-7 subtotal">
        <span class="subtotal-title">{{ $t('subtotal') }}</span>
      </div>
      <div class="col-sm-5">
        <span data-test="cart-subtotal-price">
          <BaseMoney :money="subtotal"/>
        </span>
      </div>
    </div>
    <div v-if="cartLike.shippingInfo"
         class="row">
      <div class="col-sm-7 delivery-info">
        <span class="delivery-info-title">{{ $t('shipping') }}</span>
      </div>
      <div class="col-sm-5">
        <span data-test="cart-shipping-price">
          <BaseMoney :money="cartLike.shippingInfo.price"/>
        </span>
      </div>
    </div>
    <hr class="total-divider">
    <div v-if="taxes"
         class="row">
      <div class="col-sm-7">
        <span>{{ $t('salesTax') }}</span>
      </div>
      <div data-test="cart-taxes-amount"
           class="col-sm-5">
        <BaseMoney :money="taxes"/>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-7">
        <span class="order-total">{{ $t('total') }}</span>
      </div>
      <div class="col-sm-5">
        <span data-test="cart-total-price"
              class="order-total">
          <BaseMoney :money="cartLike.totalPrice"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMoney from '../BaseMoney.vue';
import DiscountCodes from './DiscountCodes.vue';

export default {
  components: {
    DiscountCodes,
    BaseMoney,
  },

  props: {
    cartLike: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
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

    discountCodesExist() {
      return this.cartLike.discountCodes?.length;
    },
  },
};
</script>

<style scoped>
  .cart-like-price-detail {
    border-top: 1px solid #D6D6D6;
    padding: 1em 0;
    text-align: right;
  }
</style>

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
