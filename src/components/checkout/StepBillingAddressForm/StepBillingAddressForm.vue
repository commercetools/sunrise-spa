<i18n src="./StepBillingAddressForm.txt"></i18n>
<script src="./StepBillingAddressForm.js"></script>

<template>
  <div v-if="cartExists">
    <div class="checkout-step-title">
      <span>{{ $t('billingInformation') }}</span>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <BaseInput v-model="sameAddress"
                   :label="$t('sameAddress')"
                   type="checkbox"
                   data-test="checkout-form-same-as-shipping"/>
      </div>
    </div>
    <BaseForm v-if="sameAddress"
              :vuelidate="$v"
              :onSubmit="unsetBillingAddress"
              #default="{ error, state }"
              class="checkout-address-form">
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error"/>
        </div>
      </div>
      <CheckoutNavigation :state="state"
                          @back="goToShipping"/>
    </BaseForm>
    <BaseAddressForm v-else
                     :address="billingAddress"
                     :onSubmit="setBillingAddress"
                     @back="goToShipping"/>
  </div>

</template>
