import productMixin from '@/mixins/productMixin';
import BasePrice from '../BasePrice/BasePrice.vue';
import cartMixin from '../../../mixins/cartMixin';

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
  mixins: [productMixin, cartMixin],
  methods: {
    async addLineItem(sku) {
      if (!this.cartExists) {
        await this.createMyCart({
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          shippingAddress: { country: this.$store.state.country },
        });
      }
      return this.updateMyCart({
        addLineItem: {
          sku,
          quantity: 1,
        },
      }).then(() => this.$store.dispatch('openMiniCart'));
    },
  },
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
