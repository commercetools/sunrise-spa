<template>
  <BaseForm :vuelidate="$v"
            :onSubmit="submit"
            #default="{ error, state }"
            class="checkout-address-form">
    <div class="shipping-info">
      <span class="text-uppercase shipping-info-title">{{ title }}</span>
    </div>
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
                       autocomplete="fname"/>
          </div>
          <div class="col-sm-6">
            <BaseInput v-model="form.lastName"
                       :vuelidate="$v.form.lastName"
                       :label="$t('lastName')"
                       type="text"
                       autocomplete="lname"/>
          </div>
          <div class="col-sm-12">
            <BaseInput v-model="form.streetName"
                       :vuelidate="$v.form.streetName"
                       :label="$t('streetName')"
                       type="text"
                       autocomplete="street-address"/>
          </div>
          <div class="col-sm-12">
            <BaseInput v-model="form.additionalStreetInfo"
                       :vuelidate="$v.form.additionalStreetInfo"
                       :label="$t('additionalStreetInfo')"
                       type="text"/>
          </div>
          <div class="col-sm-3">
            <BaseInput v-model="form.postalCode"
                       :vuelidate="$v.form.postalCode"
                       :label="$t('postalCode')"
                       type="text"
                       autocomplete="postal-code"/>
          </div>
          <div class="col-sm-4">
            <BaseInput v-model="form.city"
                       :vuelidate="$v.form.city"
                       :label="$t('city')"
                       type="text"
                       autocomplete="address-level2"/>
          </div>
          <div class="col-sm-5">
            <BaseSelect v-model="form.country"
                        :vuelidate="$v.form.country"
                        :label="$t('country')"
                        :options="countries"/>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-6">
            <BaseInput v-model="form.phone"
                       :vuelidate="$v.form.phone"
                       :label="$t('phone')"
                       type="text"
                       autocomplete="tel"/>
          </div>
          <div class="col-sm-6">
            <BaseInput v-model="form.email"
                       :vuelidate="$v.form.email"
                       :label="$t('email')"
                       type="email"
                       autocomplete="email"/>
          </div>
        </div>
      </slot>
    </div>
    <CheckoutNavigation :state="state"
                        @back="goBack"/>
  </BaseForm>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import BaseInput from '../common/form/BaseInput.vue';
import BaseSelect from '../common/form/BaseSelect.vue';
import ServerError from '../common/form/ServerError.vue';
import CheckoutNavigation from './CheckoutNavigation.vue';
import BaseForm from '../common/form/BaseForm.vue';

export default {
  components: {
    BaseForm,
    CheckoutNavigation,
    ServerError,
    BaseInput,
    BaseSelect,
  },

  props: {
    address: Object,
    title: String,
    onSubmit: Function,
  },

  data: () => ({
    form: {},
  }),

  computed: {
    countries() {
      return [
        { id: null, name: this.$t('selectCountry') },
        { id: 'DE', name: 'Deutschland' },
        { id: 'US', name: 'United States' },
      ];
    },
  },

  methods: {
    submit() {
      return this.onSubmit(this.form);
    },

    goBack() {
      return this.$emit('back');
    },
  },

  created() {
    if (this.address) {
      const { contactInfo, ...address } = this.address;
      this.form = { ...contactInfo, ...address };
      delete this.form.__typename;
    }
  },

  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      streetName: { required },
      additionalStreetInfo: {},
      postalCode: { required },
      city: { required },
      country: { required },
      phone: {},
      email: { required, email },
    },
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
  back: "Back"
  continue: "Continue"
  selectCountry: "Select country"
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
  back: "Zurück"
  continue: "Weiter"
  selectCountry: "Land auswählen"
</i18n>
