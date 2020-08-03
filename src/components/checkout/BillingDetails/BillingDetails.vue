<i18n src="./BillingDetails.txt"></i18n>
<script src="./BillingDetails.js"></script>

<template>
  <div class="billing-info-wrap mr-100">
    <h3>{{ $t('billingDetails') }}</h3>
    <BaseAddressForm
      @updateAddress="updateBillingAddress"
      @validForm="validBillingForm"
      :address="billingAddress"
    />
    <div class="checkout-account mt-20">
      <input v-model="differentAddress" class="checkout-ship" type="checkbox" />
      <span>{{ $t('differentAddress') }}</span>
    </div>
    <div v-if="differentAddress" class="checkout-ship-open mt-30">
      <BaseAddressForm
        @updateAddress="updateShippingAddress"
        @validForm="validShippingForm"
        :address="shippingAddress"
      />
    </div>
  </div>
</template>
