import gql from 'graphql-tag';
import cartMixin from '../../../mixins/cartMixin';
import BaseAddressForm from '../BaseAddressForm/index.vue';
import ADDRESS_FRAGMENT from '../../Address.gql';

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
