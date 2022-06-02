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

    <div
      class="payment-method"
      v-for="method in paymentMethods"
      :key="method.name"
    >
      <div class="pay-top sin-payment">
        <input
          :id="method.name"
          v-model="pm"
          class="input-radio"
          type="radio"
          :value="method.name"
          name="payment_method"
        />
        <label :for="method.name"
          >{{ t(method.description) }}
          <img
            class="payment-method-img"
            :src="getImgUrl(method.image)"
        /></label>
      </div>
    </div>
  </span>
</template>
