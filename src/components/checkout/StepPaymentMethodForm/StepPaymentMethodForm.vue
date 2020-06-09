<style src="./style.css" scoped></style>
<i18n src="./StepPaymentMethodForm.txt"></i18n>
<script src="./StepPaymentMethodForm.js"></script>

<template>
  <div v-if="cartExists">
    <BaseForm :vuelidate="$v"
              :onSubmit="setPaymentMethod"
              #default="{ error, state }">
      <div class="checkout-step-title">
        <span>{{ $t('paymentMethod') }}</span>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error"/>
        </div>
      </div>
      <BaseLabel :vuelidate="$v.form.paymentMethod"
                 data-test="checkout-form-payment-methods">
        <BaseRadio v-model="form.paymentMethod"
                   value="card"
                   class="checkout-form-option">
          <span class="option-name">
            {{ $t('creditCard') }}
            <span class="option-price">
              <img src="../../../assets/img/payment-option-card.gif">
            </span>
          </span>
        </BaseRadio>
        <BaseRadio v-model="form.paymentMethod"
                   value="paypal"
                   class="checkout-form-option">
          <span class="option-name">
            PayPal
            <span class="option-price">
              <img src="../../../assets/img/payment-option-paypal.png">
            </span>
          </span>
        </BaseRadio>
      </BaseLabel>
      <CheckoutNavigation :state="state"
                          @back="goToShippingMethod"/>
    </BaseForm>
  </div>

</template>
