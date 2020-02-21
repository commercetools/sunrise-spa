import BaseAddress from '../../BaseAddress/index.vue';
import CartLikePriceDetail from '../CartLikePriceDetail/index.vue';
import CartLikeContentDetail from '../CartLikeContentDetail/index.vue';

export default {
  components: {
    CartLikeContentDetail,
    CartLikePriceDetail,
    BaseAddress,
  },
  props: {
    cartLike: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    shippingAddress() {
      return this.cartLike.shippingAddress;
    },
    billingAddress() {
      return this.cartLike.billingAddress || this.shippingAddress;
    },
    shippingMethod() {
      return this.cartLike.shippingInfo?.shippingMethod;
    },
    payments() {
      return this.cartLike.paymentInfo?.payments;
    },
  },
};
