<style src="./style.css" scoped></style>
<i18n src="./CartLikePriceDetail.txt"></i18n>
<script src="./CartLikePriceDetail.js"></script>

<template>
  <div v-if="cartLike" class="grand-total-wrap">
    <h4>{{ $t('cartTotals') }}</h4>
    <div class="grand-total-content">
      <div class="single-grand-total">
        <div class="single-grand-total-left col-sm-6">
          <span>{{ $t('subtotal') }}</span>
        </div>
        <div
          class="single-grand-total-right col-sm-6"
          data-test="cart-subtotal-price"
        >
          <span>
            <BaseMoney :money="subtotal" />
          </span>
        </div>
      </div>

      <div class="single-grand-total">
        <div class="single-grand-total-left col-sm-6">
          <span>{{ $t('salesTax') }}</span>
        </div>
        <div
          class="single-grand-total-right col-sm-6"
          data-test="cart-taxes-amount"
        >
          <span>
            <BaseMoney :money="taxes" />
          </span>
        </div>
      </div>
      <DiscountCodes
        v-if="discountCodesExist > 0"
        :cartLike="cartLike"
        :editable="editable"
      />
      <!-- <div class="single-grand-total">
        <div class="single-grand-total-left">
          <span>Shipping</span>
        </div>
        <div class="single-grand-total-right">
          <ul>
            <li>
              <input type="radio" name="shipping" value="info" checked="checked" />Flat rate: $2.00
            </li>
            <li>
              <input type="radio" name="shipping" value="info2" />Free shipping
            </li>
            <li>
              <input type="radio" name="shipping" value="info3" />Local pickup: $0.00
            </li>
          </ul>
        </div>
      </div>-->
    </div>
    <!-- <a href="#">Calculate shipping</a> -->
    <div class="cart-total-wrap">
      <div class="single-cart-total-left col-sm-6">
        <b>{{ $t('total') }}</b>
      </div>
      <div
        class="single-cart-total-right col-sm-6"
        data-test="cart-total-price"
      >
        <b>
          <BaseMoney :money="subtotal" />
        </b>
      </div>
    </div>
    <div class="grand-btn">
      <router-link :to="{ name: 'checkout' }" data-test="checkout-button">{{
        $t('checkout')
      }}</router-link>
    </div>
  </div>
</template>
