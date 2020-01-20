<template>
  <div class="row">
    <div class="col-md-6">
      <div class="secure-payment">
        <span>
          <img src="../../assets/img/credit-card-lock.png"
               class="secure-payment-icon"
               :alt="$t('securePayment')">
        </span>
        <span class="text-uppercase secure-payment-title">
          {{ $t("secureCheckout") }}
        </span>
      </div>
    </div>
    <div class="col-md-6">
      <div class="checkout-steps text-right">
        <div :class="isActive(step, 1)">
          <span class="step-number">1</span>
          <span class="text-uppercase step-title">{{ $t("shipping") }}</span>
        </div>
        <div :class="isActive(step, 2)">
          <span class="step-number">2</span>
          <span class="text-uppercase step-title">{{ $t("payment") }}</span>
        </div>
        <div :class="isActive(step, 3)">
          <span class="step-number">3</span>
          <span class="text-uppercase step-title">{{ $t("confirmation") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    step() {
      switch (this.$route.name) {
        case 'checkout-payment-method': return 2;
        case 'checkout-order': return 3;
        default: return 1;
      }
    },
  },

  methods: {
    isActive(current, step) {
      return { active: current === step };
    },
  },
};
</script>

<i18n>
en:
  secureCheckout: "Secure Checkout"
  securePayment: "Secure payment"
  shipping: "Shipping"
  payment: "Payment"
  confirmation: "Confirmation"
de:
  secureCheckout: "Sicherer Bestellprozess"
  securePayment: "Sichere Bezahlung"
  shipping: "Versand"
  payment: "Zahlung"
  confirmation: "Bestätigung"
</i18n>
