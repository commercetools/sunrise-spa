<template>
  <div class="checkout-shipping">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="secure-payment">
            <span>
              <img src="../../assets/img/credit-card-lock.png"
                   class="secure-payment-icon"
                   :alt="$t('securePayment')">
            </span>
            <span class="text-uppercase secure-payment-title">
              <!--{{ $t("shippingPage.title") }}-->
            </span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="checkout-steps text-right">
            <div>
              <span class="step-number">1</span>
              <span class="text-uppercase step-title}">{{ $t("shipping") }}</span>
            </div>
            <div>
              <span class="step-number">2</span>
              <span class="text-uppercase step-title">{{ $t("payment") }}</span>
            </div>
            <div>
              <span class="step-number">3</span>
              <span class="text-uppercase step-title">{{ $t("confirmation") }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="checkout">
            <div class="row">
              <div class="col-sm-7">
                <component :is="showStep"/>
              </div>
              <div class="col-sm-5">
                <CartOverview/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartOverview from './CartOverview.vue';
import StepAddressForm from './StepAddressForm.vue';

export default {
  components: {
    CartOverview,
    StepAddressForm,
  },

  props: ['showStep'],
};
</script>

<i18n>
en:
  securePayment: "Secure payment"
  shipping: "Shipping"
  payment: "Payment"
  confirmation: "Confirmation"
de:
  securePayment: "Sichere Bezahlung"
  shipping: "Versand"
  payment: "Zahlung"
  confirmation: "Bestätigung"
</i18n>
