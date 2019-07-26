<template>
  <div v-if="cartExists">
    <div class="checkout-step-title">
      <span>{{ $t('shippingInformation') }}</span>
    </div>
    <BaseAddressForm :address="shippingAddress"
                     :onSubmit="setShippingAddress"
                     @back="goToCart"/>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import cartMixin from '../../mixins/cartMixin';
import BaseAddressForm from './BaseAddressForm.vue';
import ADDRESS_FRAGMENT from '../Address.gql';

export default {
  components: {
    BaseAddressForm,
  },

  mixins: [cartMixin],

  data: () => ({
    me: null,
  }),

  computed: {
    shippingAddress() {
      return this.me?.activeCart?.shippingAddress;
    },
  },

  methods: {
    setShippingAddress(address) {
      return this.updateMyCart([
        { setShippingAddress: { address } },
      ]).then(() => this.$router.push({ name: 'checkout-billing-address' }));
    },

    goToCart() {
      return this.$router.push({ name: 'cart' });
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
                ...AddressFields
              }
            }
          }
        }
        ${ADDRESS_FRAGMENT}`,
    },
  },
};
</script>

<i18n>
en:
  shippingInformation: "Shipping Information"
de:
  shippingInformation: "Versand Information"
</i18n>
