<script src="./PaymentMethod.js"></script>
<i18n src="./PaymentMethod.txt" lang="yaml"></i18n>

<template>
  <span>
    <div class="checkout-shipping-content">
      <div class="shipping-content-left">
        <span class="bold-text">{{
          t('paymentMethod')
        }}</span>
      </div>
    </div>
    <div class="payment-method">
      <div class="pay-top sin-payment">
        <input
          id="payment_method_1"
          v-model="pm"
          class="input-radio"
          type="radio"
          value="card"
          name="payment_method"
        />
        <label for="payment_method_1"
          >{{ t('creditCard') }}
          <img
            class="payment-method-img"
            :src="
              require('presentation/assets/img/CREDIT CARDS.png')
            "
        /></label>
      </div>
      <div class="pay-top sin-payment">
        <input
          id="payment-method-2"
          v-model="pm"
          class="input-radio"
          type="radio"
          value="paypal"
          name="payment_method"
        />
        <label for="payment-method-2"
          >PayPal
          <img
            class="payment-method-img"
            :src="
              require('presentation/assets/img/PayPal.png')
            "
        /></label>
      </div>
    </div>
  </span>
</template>
