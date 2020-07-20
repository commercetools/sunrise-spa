<style src="./style.css" scoped></style>
<i18n src="./PaymentMethod.txt"></i18n>
<script src="./PaymentMethod.js"></script>

<template>
  <!-- <div v-if="cartExists">
    <BaseForm
      :vuelidate="$v"
      :onSubmit="setPaymentMethod"
      #default="{ error, state }"
    >
      <div class="checkout-step-title">
        <span>{{ $t('paymentMethod') }}</span>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error" />
        </div>
      </div>
      <BaseLabel
        :vuelidate="$v.form.paymentMethod"
        data-test="checkout-form-payment-methods"
      >
        <BaseRadio
          v-model="form.paymentMethod"
          value="card"
          class="checkout-form-option"
        >
          <span class="option-name">
            {{ $t('creditCard') }}
            <span class="option-price">
              <img src="../../../assets/img/payment-option-card.gif" />
            </span>
          </span>
        </BaseRadio>
        <BaseRadio
          v-model="form.paymentMethod"
          value="paypal"
          class="checkout-form-option"
        >
          <span class="option-name">
            PayPal
            <span class="option-price">
              <img src="../../../assets/img/payment-option-paypal.png" />
            </span>
          </span>
        </BaseRadio>
      </BaseLabel>
      <CheckoutNavigation :state="state" @back="goToShippingMethod" />
    </BaseForm>
  </div> -->
  <span>
    <div class="checkout-shipping-content">
      <div class="shipping-content-left">
        <span>{{ $t('paymentMethod') }}</span>
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
