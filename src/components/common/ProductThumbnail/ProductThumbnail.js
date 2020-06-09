import productMixin from '@/mixins/productMixin';
import BasePrice from '../BasePrice/BasePrice.vue';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    BasePrice,
  },
  mixins: [productMixin],
  computed: {
    matchingVariant() {
      // with query endpoint we cannot really determine
      return this.currentProduct.masterVariant || {};
    },
    hasMoreColors() {
      // with sunrise data it is not possible to determine
      return false;
    },
    hasDiscount() {
      return this.matchingVariant.price.discounted;
    },
    hasImages() {
      return Array.isArray(this.matchingVariant.images) && this.matchingVariant.images.length > 0;
    },
  },
};
