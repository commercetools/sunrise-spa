<template>
  <div class="col-sm-6">
    <div class="my-orders-order-dark-box">
      <div class="my-orders-order-dark-box-title">{{ $t('paymentDetails') }}</div>
      <div v-if="paymentInfo">
        <span v-for="payment in paymentInfo.payments"
              :key="payment.id">
          {{ payment.paymentMethodInfo.method }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paymentInfo: {
      type: Object,
      required: false,
    },
  },
};
</script>

<i18n>
en:
  paymentDetails: "Payment details"
de:
  paymentDetails: "Zahlungsdetails"
</i18n>
