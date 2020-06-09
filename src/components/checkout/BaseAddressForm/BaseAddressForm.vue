<i18n src="./BaseAddressForm.txt"></i18n>
<script src="./BaseAddressForm.js"></script>

<template>
  <BaseForm :vuelidate="$v"
            :onSubmit="submit"
            #default="{ error, state }"
            class="checkout-address-form">
    <div class="address-form shipping-address-form">
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error"/>
        </div>
      </div>
      <slot/>
      <slot name="fields">
        <div class="row">
          <div class="col-sm-6">
            <BaseInput v-model="form.firstName"
                       :vuelidate="$v.form.firstName"
                       :label="$t('firstName')"
                       type="text"
                       autocomplete="fname"
                       data-test="address-form-firstName"/>
          </div>
          <div class="col-sm-6">
            <BaseInput v-model="form.lastName"
                       :vuelidate="$v.form.lastName"
                       :label="$t('lastName')"
                       type="text"
                       autocomplete="lname"
                       data-test="address-form-lastName"/>
          </div>
          <div class="col-sm-12">
            <BaseInput v-model="form.streetName"
                       :vuelidate="$v.form.streetName"
                       :label="$t('streetName')"
                       type="text"
                       autocomplete="street-address"
                       data-test="address-form-streetName"/>
          </div>
          <div class="col-sm-12">
            <BaseInput v-model="form.additionalStreetInfo"
                       :vuelidate="$v.form.additionalStreetInfo"
                       :label="$t('additionalStreetInfo')"
                       type="text"
                       data-test="address-form-additionalStreetInfo"/>
          </div>
          <div class="col-sm-3">
            <BaseInput v-model="form.postalCode"
                       :vuelidate="$v.form.postalCode"
                       :label="$t('postalCode')"
                       type="text"
                       autocomplete="postal-code"
                       data-test="address-form-postalCode"/>
          </div>
          <div class="col-sm-4">
            <BaseInput v-model="form.city"
                       :vuelidate="$v.form.city"
                       :label="$t('city')"
                       type="text"
                       autocomplete="address-level2"
                       data-test="address-form-city"/>
          </div>
          <div class="col-sm-5">
            <BaseSelect v-model="form.country"
                        :vuelidate="$v.form.country"
                        :label="$t('country')"
                        :options="countries"
                        data-test="address-form-country"/>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-6">
            <BaseInput v-model="form.phone"
                       :vuelidate="$v.form.phone"
                       :label="$t('phone')"
                       type="text"
                       autocomplete="tel"
                       data-test="address-form-phone"/>
          </div>
          <div class="col-sm-6">
            <BaseInput v-model="form.email"
                       :vuelidate="$v.form.email"
                       :label="$t('email')"
                       type="email"
                       autocomplete="email"
                       data-test="address-form-email"/>
          </div>
        </div>
      </slot>
    </div>
    <CheckoutNavigation :state="state"
                        @back="goBack"/>
  </BaseForm>

</template>
