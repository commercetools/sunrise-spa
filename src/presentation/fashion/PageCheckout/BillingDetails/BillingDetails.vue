<i18n src="./BillingDetails.txt" lang="yaml"></i18n>
<script src="./BillingDetails.js"></script>

<template>
  <div class="billing-info-wrap mr-100">
    <h3>{{ t('billingDetails') }}</h3>
    <BaseAddressForm
      @update-address="updateBillingAddress"
      @valid-form="validBillingForm"
      :address="billingAddress"
    />
    <div class="checkout-account mt-20">
      <input
        v-model="differentAddress"
        class="checkout-ship"
        type="checkbox"
        data-test="other-shipping-address"
      />
      <span>{{ t('differentAddress') }}</span>
    </div>
    <div
      v-if="differentAddress"
      class="checkout-ship-open mt-30"
      data-test="alt-shipping-address"
    >
      <BaseAddressForm
        @update-address="updateShippingAddress"
        @valid-form="validShippingForm"
        :address="shippingAddress"
      />
    </div>
  </div>
</template>
