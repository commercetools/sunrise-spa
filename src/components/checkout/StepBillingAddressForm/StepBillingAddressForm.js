import gql from 'graphql-tag';
import { required } from 'vuelidate/lib/validators';
import cartMixin from '../../../mixins/cartMixin';
import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
import BaseAddressForm from '../BaseAddressForm/BaseAddressForm.vue';
import ServerError from '../../common/form/ServerError/ServerError.vue';
import CheckoutNavigation from '../CheckoutNavigation/CheckoutNavigation.vue';
import ADDRESS_FRAGMENT from '../../Address.gql';

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
