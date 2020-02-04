import { required } from 'vuelidate/lib/validators';
import cartMixin from '../../../mixins/cartMixin';
import BaseRadio from '../../common/form/BaseRadio/index.vue';
import BaseForm from '../../common/form/BaseForm/index.vue';
import BaseLabel from '../../common/form/BaseLabel/index.vue';
import ServerError from '../../common/form/ServerError/index.vue';
import CheckoutNavigation from '../CheckoutNavigation/index.vue';

export default {
  components: {
    BaseLabel,
    CheckoutNavigation,
    ServerError,
    BaseForm,
    BaseRadio,
  },
  mixins: [cartMixin],
  data: () => ({
    form: {
      paymentMethod: 'card',
    },
  }),
  methods: {
    setPaymentMethod() {
      // TODO create payment and add it to the cart, but missing CreateMyPayment mutation
      // return this.updateMyCart([
      //   {
      //     addPayment: {
      //       payment: {
      //         typeId: 'payment',
      //         id: paymentId
      //       },
      //     },
      //   },
      // ]).then(() => this.$router.push({ name: 'checkout-confirmation' }));
      return Promise.resolve(this.$router.push({ name: 'checkout-order' }));
    },
    goToShippingMethod() {
      this.$router.push({ name: 'checkout-shipping-method' });
    },
  },
  validations: {
    form: {
      paymentMethod: { required },
    },
  },
};
