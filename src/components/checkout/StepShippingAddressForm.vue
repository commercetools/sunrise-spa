<template>
  <form @submit="submit(setShippingAddress)">
    <div class="shipping-info">
      <span class="text-uppercase shipping-info-title">{{ $t('shippingInformation') }}</span>
      <span class="pull-right required-fields">{{ $t('form.required') }} *</span>
    </div>
    <div class="address-form">
      <div class="row">
        <div class="col-sm-6">
          <BaseInput v-model="form.firstName"
                     :vuelidate="$v.form.firstName"
                     :label="$t('firstName')"
                     type="text"
                     autocomplete="fname"
                     class="checkout-input-field"/>
        </div>
        <div class="col-sm-6">
          <BaseInput v-model="form.lastName"
                     :vuelidate="$v.form.lastName"
                     :label="$t('lastName')"
                     type="text"
                     autocomplete="lname"
                     class="checkout-input-field"/>
        </div>
        <div class="col-sm-12">
          <BaseInput v-model="form.streetName"
                     :vuelidate="$v.form.streetName"
                     :label="$t('streetName')"
                     type="text"
                     autocomplete="shipping street-address"
                     class="checkout-input-field"/>
        </div>
        <div class="col-sm-12">
          <BaseInput v-model="form.additionalStreetInfo"
                     :vuelidate="$v.form.additionalStreetInfo"
                     :label="$t('additionalStreetInfo')"
                     type="text"
                     class="checkout-input-field"/>
        </div>
        <div class="col-sm-4">
          <BaseInput v-model="form.city"
                     :vuelidate="$v.form.city"
                     :label="$t('city')"
                     type="text"
                     autocomplete="shipping locality"
                     class="checkout-input-field"/>
        </div>
        <div class="col-sm-3">
          <BaseInput v-model="form.postalCode"
                     :vuelidate="$v.form.postalCode"
                     :label="$t('postalCode')"
                     type="text"
                     autocomplete="shipping postal-code"
                     class="checkout-input-field"/>
        </div>
        <div class="col-sm-5">
          <div class="country input-block">
            <BaseSelect v-model="form.country"
                        :vuelidate="$v.form.country"
                        :label="$t('country')"
                        class="checkout-dropdown"/>
          </div>
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
                     class="checkout-input-field"/>
        </div>
        <div class="col-sm-6">
          <BaseInput v-model="form.email"
                     :vuelidate="$v.form.email"
                     :label="$t('email')"
                     type="email"
                     autocomplete="email"
                     class="checkout-input-field"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div>
          <LoadingButton id="shipping-continue-checkout-btn-xs"
                         class="btn text-uppercase checkout-checkout-btn">
            {{ $t('continue') }}
          </LoadingButton>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag';
import { required, email } from 'vuelidate/lib/validators';
import BaseInput from '../common/BaseInput.vue';
import BaseSelect from '../common/BaseSelect.vue';
import LoadingButton from '../common/LoadingButton.vue';

export default {
  components: {
    LoadingButton,
    BaseSelect,
    BaseInput,
  },

  props: {
    address: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    me: null,
    form: {},
  }),

  methods: {
    setShippingAddress() {
      return this.updateMyCart([
        { setShippingAddress: { address: this.form } },
      ]);
    },
  },

  watch: {
    address(value) {
      this.form = { ...value.activeCart.shippingAddress };
    },
  },

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            activeCart {
              id
              version
              shippingAddress {
                firstName
                lastName
                streetName
                additionalStreetInfo
                city
                postalCode
                country
                phone
                email
              }
            }
          }
        }`,
    },
  },

  validations() {
    return {
      form: {
        firstName: { required },
        lastName: { required },
        streetName: { required },
        additionalStreetInfo: {},
        city: { required },
        postalCode: { required },
        country: { required },
        phone: {},
        email: { required, email },
      },
    };
  },
};
</script>

<style scoped>
.address-form {
  margin: 0.5em 1em;
}
</style>

<i18n>
en:
  shippingInformation: "Shipping Information"
  firstName: "First Name"
  lastName: "Last Name"
  streetName: "Address"
  additionalStreetInfo: "Additional address info"
  city: "City"
  postalCode: "Postal Code"
  country: "Country"
  email: "Email"
  phone: "Phone"
  continue: "Continue"
de:
  shippingInformation: "Versand Information"
  firstName: "Vorname"
  lastName: "Nachname"
  streetName: "Straße und Hausnummer"
  additionalStreetInfo: "Adresszusatz"
  city: "Stadt"
  postalCode: "PLZ"
  country: "Land"
  email: "E-Mail-Adresse"
  phone: "Telefon"
  continue: "Weiter"
</i18n>
