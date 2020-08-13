<i18n src="./BaseAddressForm.txt"></i18n>
<script src="./BaseAddressForm.js"></script>

<template>
  <div class="row">
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ $t('firstName') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          :vuelidate="$v.form.firstName"
          v-model="form.firstName"
          type="text"
          data-test="address-form-firstName"
        />
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ $t('lastName') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          :vuelidate="$v.form.lastName"
          v-model="form.lastName"
          type="text"
          data-test="address-form-lastName"
        />
      </div>
    </div>

    <div class="col-lg-12">
      <div class="billing-info mb-25">
        <label>
          {{ $t('address') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          class="billing-address"
          v-model="form.streetName"
          :vuelidate="$v.form.streetName"
          :placeholder="$t('streetName')"
          type="text"
          data-test="address-form-streetName"
        />
        <input
          v-model="form.additionalStreetInfo"
          :placeholder="$t('additional')"
          type="text"
          data-test="address-form-additionalStreetInfo"
        />
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ $t('postCode') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          :vuelidate="$v.form.postalCode"
          v-model="form.postalCode"
          type="text"
          data-test="address-form-postalCode"
        />
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ $t('city') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          :vuelidate="$v.form.city"
          v-model="form.city" type="text"
          data-test="address-form-city"
        />
      </div>
    </div>
    <div class="col-lg-12">
      <div class="billing-select mb-25">
        <label>
          {{ $t('country') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <select
          :vuelidate="$v.form.country"
          v-model="form.country"
          class="select"
        >
          <option
            v-for="country in countries"
            :value="country.id"
            :key="country.id"
            >{{ country.name }}</option
          >
        </select>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ $t('phone') }}
        </label>
        <input
          :vuelidate="$v.form.phone"
          v-model="form.phone" type="tel"
          data-test="address-form-phone"
        />
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ $t('email') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          :vuelidate="$v.form.email"
          v-model="form.email" type="email"
          data-test="address-form-email"
        />
      </div>
    </div>
  </div>
</template>
