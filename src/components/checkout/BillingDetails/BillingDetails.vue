<i18n src="./BillingDetails.txt"></i18n>
<script src="./BillingDetails.js"></script>

<template>
  <div class="billing-info-wrap mr-100">
    <h3>{{ $t('billingDetails') }}</h3>
    <BaseAddressForm
      @updateAddress="updateBillingAddress"
      @validForm="validForm"
      :address="billingAddress"
    />
    <div class="checkout-account mt-20">
      <input
        v-model="differentAddress"
        class="checkout-ship"
        type="checkbox"
        data-test="other-shipping-address"
      />
      <span>{{ $t('differentAddress') }}</span>
    </div>
    <div
      v-if="differentAddress"
      class="checkout-ship-open mt-30"
      data-test="alt-shipping-address"
    >
      <BaseAddressForm
        @updateAddress="updateShippingAddress"
        :address="shippingAddress"
      />
    </div>
  </div>
</template>
