<template>
  <BaseAddressForm v-if="cartExists"
                   :address="shippingAddress"
                   :title="$t('shippingInformation')"
                   :onSubmit="setShippingAddress"
                   @back="goToCart"/>
</template>

<script>
import gql from 'graphql-tag';
import cartMixin from '../../mixins/cartMixin';
import BaseAddressForm from './BaseAddressForm.vue';
import BASE_ADDRESS_FRAGMENT from '../BaseAddress.gql';

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
      ]).then(() => this.$router.push({ name: 'checkout-billing' }));
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
                ...BaseAddress
              }
            }
          }
        }
        ${BASE_ADDRESS_FRAGMENT}`,
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
