<template>
  <div v-if="cartExists">
    <div class="checkout-step-title">
      <span>{{ $t('billingInformation') }}</span>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <BaseInput v-model="sameAddress"
                   :label="$t('sameAddress')"
                   type="checkbox"/>
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

<script>
import gql from 'graphql-tag';
import { required } from 'vuelidate/lib/validators';
import cartMixin from '../../mixins/cartMixin';
import BaseInput from '../common/form/BaseInput.vue';
import BaseForm from '../common/form/BaseForm.vue';
import BaseAddressForm from './BaseAddressForm.vue';
import ServerError from '../common/form/ServerError.vue';
import CheckoutNavigation from './CheckoutNavigation.vue';
import ADDRESS_FRAGMENT from '../Address.gql';

export default {
  components: {
    CheckoutNavigation,
    ServerError,
    BaseForm,
    BaseAddressForm,
    BaseInput,
  },

  mixins: [cartMixin],

  data: () => ({
    me: null,
    sameAddress: true,
  }),

  computed: {
    billingAddress() {
      return this.me?.activeCart?.billingAddress;
    },
  },

  methods: {
    unsetBillingAddress() {
      return this.setBillingAddress(null);
    },

    setBillingAddress(address) {
      return this.updateMyCart([
        { setBillingAddress: { address } },
      ]).then(() => this.$router.push({ name: 'checkout-shipping-method' }));
    },

    goToShipping() {
      this.$router.push({ name: 'checkout' });
    },
  },

  watch: {
    me(value) {
      this.sameAddress = !value.activeCart?.billingAddress;
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
              billingAddress {
                ...AddressFields
              }
            }
          }
        }
        ${ADDRESS_FRAGMENT}`,
    },
  },

  validations: {
    sameAddress: { required },
  },
};
</script>

<i18n>
en:
  sameAddress: "Same as shipping address"
  billingInformation: "Billing Information"
de:
  sameAddress: "Entspricht die Lieferadresse"
  billingInformation: "Rechnung Information"
</i18n>
