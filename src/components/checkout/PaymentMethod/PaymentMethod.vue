<style src="./style.css" scoped></style>
<i18n src="./PaymentMethod.txt"></i18n>
<script src="./PaymentMethod.js"></script>

<template>
  <span>
    <div class="checkout-shipping-content">
      <div class="shipping-content-left">
        <span class="bold-text">{{ $t('paymentMethod') }}</span>
      </div>
    </div>
    <div class="payment-method">
      <div class="pay-top sin-payment">
        <input
          id="payment_method_1"
          v-model="paymentMethod"
          class="input-radio"
          type="radio"
          value="card"
          name="payment_method"
        />
        <label for="payment_method_1"
          >{{ $t('creditCard') }}
          <img
            class="payment-method-img"
            src="../../../assets/img/CREDIT CARDS.png"
        /></label>
      </div>
      <div class="pay-top sin-payment">
        <input
          id="payment-method-2"
          v-model="paymentMethod"
          class="input-radio"
          type="radio"
          value="paypal"
          name="payment_method"
        />
        <label for="payment-method-2"
          >PayPal
          <img class="payment-method-img" src="../../../assets/img/PayPal.png"
        /></label>
      </div>
    </div>
  </span>
</template>
