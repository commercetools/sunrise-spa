import cartMixin from '../../../mixins/cartMixin';
import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
import BaseForm from '../../common/form/BaseForm/BaseForm.vue';
import BaseAddressForm from '../BaseAddressForm/BaseAddressForm.vue';
import ServerError from '../../common/form/ServerError/ServerError.vue';

export default {
  props: {
    billingAddress: Object,
    shippingAddress: Object,
  },
  components: {
    ServerError,
    BaseForm,
    BaseAddressForm,
    BaseInput,
  },
  mixins: [cartMixin],
  data: () => ({
    differentAddress: false,
    newBillingAddress: null,
    newShippingAddress: null,
  }),
  watch: {
    differentAddress() {
      if (!this.differentAddress) {
        this.newShippingAddress = this.newBillingAddress;
        this.validShippingForm(true);
      } else {
        this.validShippingForm(false);
      }
    },
    billingToJSON() {
      this.$emit('updateBillingDetails', this.newBillingAddress);
    },
    shippingToJSON() {
      this.$emit('updateShippingDetails', this.newShippingAddress);
    },
  },
  computed: {
    billingToJSON() {
      return JSON.stringify(this.newBillingAddress);
    },
    shippingToJSON() {
      return JSON.stringify(this.newShippingAddress);
    },

  },
  methods: {
    unsetBillingAddress() {
      return this.setBillingAddress(null);
    },
    updateBillingAddress(address) {
      this.newBillingAddress = address;
    },
    updateShippingAddress(address) {
      this.newShippingAddress = address;
    },
    validBillingForm(valid) {
      this.$emit('validBillingForm', valid);
    },
    validShippingForm(valid) {
      this.$emit('validShippingForm', valid);
    },
  },
};
