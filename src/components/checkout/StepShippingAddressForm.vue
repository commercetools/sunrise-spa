<template>
  <form v-if="cartExists"
        @submit.prevent="submit(setShippingAddress)"
        id="checkout-shipping-address-form">
    <div class="shipping-info">
      <span class="text-uppercase shipping-info-title">{{ $t('shippingInformation') }}</span>
    </div>
    <div class="address-form shipping-address-form">
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="serverError"/>
        </div>
      </div>
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
                     autocomplete="shipping street-address"/>
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
                     autocomplete="shipping postal-code"/>
        </div>
        <div class="col-sm-4">
          <BaseInput v-model="form.city"
                     :vuelidate="$v.form.city"
                     :label="$t('city')"
                     type="text"
                     autocomplete="shipping address-level2"/>
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
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div>
          <LoadingButton :buttonState="buttonState"
                         type="submit"
                         id="shipping-continue-checkout-btn-xs"
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
import formMixin from '../../mixins/formMixin';
import cartMixin from '../../mixins/cartMixin';
import BaseInput from '../common/form/BaseInput.vue';
import BaseSelect from '../common/form/BaseSelect.vue';
import LoadingButton from '../common/form/LoadingButton.vue';
import ServerError from '../common/form/ServerError.vue';

export default {
  components: {
    ServerError,
    LoadingButton,
    BaseSelect,
    BaseInput,
  },

  mixins: [formMixin, cartMixin],

  data: () => ({
    me: null,
    form: {},
  }),

  computed: {
    countries() {
      return [
        { id: 'DE', name: 'Deutschland' },
        { id: 'US', name: 'United States' },
      ];
    },
  },

  methods: {
    setShippingAddress() {
      return this.updateMyCart([
        { setShippingAddress: { address: this.form } },
      ]);
    },
  },

  watch: {
    me(value) {
      if (value?.activeCart?.shippingAddress) {
        const { contactInfo, ...address } = value.activeCart.shippingAddress;
        this.form = { ...contactInfo, ...address };
        delete this.form.__typename;
      }
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
                postalCode
                city
                country
                contactInfo {
                  phone
                  email
                }
              }
            }
          }
        }`,
    },
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

<style lang="scss">
#checkout-shipping-address-form {
  margin: 0.5em 1em;

  .selectboxit {
    background: url('../../assets/img/arrow-67-filled.png') no-repeat 90% 50% #fff;
    background-size: 12px;
    border: 1px solid #D6D6D6;
    border-radius: 1px;
  }
  .selectboxit, .selectboxit-options {
    width: 100% !important;
  }
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
