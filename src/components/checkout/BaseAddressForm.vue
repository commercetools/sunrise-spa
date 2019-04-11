<template>
  <div class="address-form">
    <div class="row">
      <div class="col-sm-6">
        <BaseFormField :vuelidate="$v.firstName"
                       :label="$t('firstName')">
          <input v-model.trim.lazy="$v.firstName.$model"
                 autocomplete="fname"
                 type="text"
                 class="checkout-input-field"/>
        </BaseFormField>
      </div>
      <div class="col-sm-6">
        <BaseFormField :vuelidate="$v.lastName"
                       :label="$t('lastName')">
          <input v-model.trim.lazy="$v.lastName.$model"
                 autocomplete="lname"
                 type="text"
                 class="checkout-input-field"/>
        </BaseFormField>
      </div>
      <div class="col-sm-12">
        <BaseFormField :vuelidate="$v.streetName"
                       :label="$t('streetName')">
          <input v-model.trim.lazy="$v.streetName.$model"
                 autocomplete="shipping street-address"
                 type="text"
                 class="checkout-input-field"/>
        </BaseFormField>
      </div>
      <div class="col-sm-12">
        <BaseFormField :vuelidate="$v.additionalStreetInfo"
                       :label="$t('additionalStreetInfo')">
          <input v-model.trim.lazy="$v.additionalStreetInfo.$model"
                 type="text"
                 class="checkout-input-field"/>
        </BaseFormField>
      </div>
      <div class="col-sm-4">
        <BaseFormField :vuelidate="$v.city"
                       :label="$t('city')">
          <input v-model.trim.lazy="$v.city.$model"
                 autocomplete="shipping locality"
                 type="text"
                 class="checkout-input-field"/>
        </BaseFormField>
      </div>
      <div class="col-sm-3">
        <BaseFormField :vuelidate="$v.postalCode"
                       :label="$t('postalCode')">
          <input v-model.trim.lazy="$v.postalCode.$model"
                 autocomplete="shipping postal-code"
                 type="text"
                 class="checkout-input-field"/>
        </BaseFormField>
      </div>
      <div class="col-sm-5">
        <BaseFormField :vuelidate="$v.country"
                       :label="$t('country')">

        <!--<div class="country input-block">-->
          <select v-model.lazy="$v.country.$model"
                  class="checkout-dropdown">
            <!--{{#each options.list}}-->
            <!--<option value="{{value}}" {{#if selected}}selected{{/if}}>{{label}}</option>-->
            <!--{{/each}}-->
          </select>
        </BaseFormField>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-6">
        <BaseFormField :vuelidate="$v.phone"
                       :label="$t('phone')">
          <input v-model.trim.lazy="$v.phone.$model"
                 autocomplete="tel"
                 type="text"
                 class="checkout-input-field"/>
        </BaseFormField>
      </div>
      <div class="col-sm-6">
        <BaseFormField :vuelidate="$v.email"
                       :label="$t('email')">
          <input v-model.trim.lazy="$v.email.$model"
                 autocomplete="email"
                 type="text"
                 class="checkout-input-field"/>
        </BaseFormField>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import BaseFormField from '../common/BaseFormField.vue';

export default {
  components: {
    BaseFormField,
  },

  data: () => ({
    firstName: null,
    lastName: null,
    streetName: null,
    additionalStreetInfo: null,
    city: null,
    postalCode: null,
    country: null,
    phone: null,
    email: null,
  }),

  validations() {
    return {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      streetName: {
        required,
      },
      additionalStreetInfo: {
      },
      city: {
        required,
      },
      postalCode: {
        required,
      },
      country: {
        required,
      },
      phone: {
      },
      email: {
        required,
        email,
      },
    };
  },
};
</script>

<i18n>
en:
  firstName: "First Name"
  lastName: "Last Name"
  streetName: "Address"
  additionalStreetInfo: "Additional address info"
  city: "City"
  postalCode: "Postal Code"
  country: "Country"
  email: "Email"
  phone: "Phone"
de:
  firstName: "Vorname"
  lastName: "Nachname"
  streetName: "Straße und Hausnummer"
  additionalStreetInfo: "Adresszusatz"
  city: "Stadt"
  postalCode: "PLZ"
  country: "Land"
  email: "E-Mail-Adresse"
  phone: "Telefon"
</i18n>
