import CheckoutTitle from '../CheckoutTitle/CheckoutTitle.vue';
import CartOverview from '../CartOverview/CartOverview.vue';

export default {
  components: {
    CheckoutTitle,
    CartOverview,
  },
  data: () => ({
    showLogin: false,
    showCoupon: false,
  }),
};
