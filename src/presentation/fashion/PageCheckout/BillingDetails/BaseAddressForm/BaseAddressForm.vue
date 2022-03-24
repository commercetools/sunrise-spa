<i18n src="./BaseAddressForm.txt" lang="yaml"></i18n>
<script src="./BaseAddressForm.js"></script>

<template>
  <div class="row">
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('firstName') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          v-model="v.firstName.$model"
          type="text"
          data-test="address-form-firstName"
        />
      </div>
      <div
        v-for="error of v.firstName.$silentErrors"
        :key="error.$message"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('lastName') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          v-model="v.lastName.$model"
          type="text"
          data-test="address-form-lastName"
        />
      </div>
      <div
        v-for="error of v.lastName.$silentErrors"
        :key="error.$message"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>

    <div class="col-lg-12">
      <div class="billing-info mb-25">
        <label>
          {{ t('address') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          class="billing-address"
          v-model="v.streetName.$model"
          :placeholder="t('streetName')"
          type="text"
          data-test="address-form-streetName"
        />
        <div
          v-for="error of v.streetName.$silentErrors"
          :key="error.$message"
        >
          <div>{{ error.$message }}</div>
        </div>
        <input
          v-model="form.additionalStreetInfo"
          :placeholder="t('additional')"
          type="text"
          data-test="address-form-additionalStreetInfo"
        />
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('postCode') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          v-model="v.postalCode.$model"
          type="text"
          data-test="address-form-postalCode"
        />
      </div>
      <div
        v-for="error of v.postalCode.$silentErrors"
        :key="error.$message"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('city') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          v-model="v.city.$model"
          type="text"
          data-test="address-form-city"
        />
      </div>
      <div
        v-for="error of v.city.$silentErrors"
        :key="error.$message"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>
    <div class="col-lg-12" style="display: none">
      <div class="billing-select mb-25">
        <label>
          {{ t('country') }}
          <abbr class="required" title="required">*</abbr>
        </label>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('phone') }}
        </label>
        <input
          v-model="v.phone.$model"
          type="tel"
          data-test="address-form-phone"
        />
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="billing-info mb-25">
        <label>
          {{ t('email') }}
          <abbr class="required" title="required">*</abbr>
        </label>
        <input
          v-model="v.email.$model"
          type="email"
          data-test="address-form-email"
        />
      </div>
      <div
        v-for="error of v.email.$silentErrors"
        :key="error.$message"
      >
        <div>{{ error.$message }}</div>
      </div>
    </div>
  </div>
</template>
