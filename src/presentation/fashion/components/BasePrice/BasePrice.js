import { computed } from 'vue';
import BaseMoney from '../BaseMoney/BaseMoney.vue';

export default {
  components: {
    BaseMoney,
  },
  props: {
    price: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const hasDiscount = computed(() => {
      return props?.price?.discounted;
    });
    const discountedPrice = computed(() => {
      return props?.price?.discounted?.value;
    });
    const originalPrice = computed(() => {
      return props?.price?.value;
    });
    return { hasDiscount, discountedPrice, originalPrice };
  },
};
