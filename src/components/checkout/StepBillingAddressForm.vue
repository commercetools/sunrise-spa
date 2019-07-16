<template>
  <div v-if="cartExists">
    <BaseAddressForm :address="billingAddress"
                     :title="$t('billingInformation')"
                     :onSubmit="handleSubmit"
                     @back="goToShipping">
      <div class="row">
        <div class="col-sm-12">
          <BaseInput v-model="sameAddress"
                     :label="$t('sameAddress')"
                     type="checkbox"/>
        </div>
      </div>
      <template v-if="sameAddress"
                #fields>
        <BaseAddress :address="shippingAddress"/>
      </template>
    </BaseAddressForm>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { required } from 'vuelidate/lib/validators';
import BASE_ADDRESS_FRAGMENT from '../BaseAddress.gql';
import cartMixin from '../../mixins/cartMixin';
import BaseInput from '../common/form/BaseInput.vue';
import BaseAddressForm from './BaseAddressForm.vue';
import BaseAddress from '../common/BaseAddress.vue';

export default {
  components: {
    BaseAddress,
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

    shippingAddress() {
      return this.me?.activeCart?.shippingAddress;
    },
  },

  methods: {
    handleSubmit(diffAddress) {
      const address = this.sameAddress ? null : diffAddress;
      return this.setBillingAddress(address)
        .then(() => this.$router.push({ name: 'cart' })); // change to next step
    },

    setBillingAddress(address) {
      return this.updateMyCart([
        { setBillingAddress: { address } },
      ]);
    },

    goToShipping() {
      this.$router.push({ name: 'checkout' });
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
                ...BaseAddress
              }
              shippingAddress {
                ...BaseAddress
              }
            }
          }
        }
        ${BASE_ADDRESS_FRAGMENT}`,
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
