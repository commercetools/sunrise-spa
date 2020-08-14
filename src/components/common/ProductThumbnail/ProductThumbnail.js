import productMixin from '@/mixins/productMixin';
import BasePrice from '../BasePrice/BasePrice.vue';
import cartMixin from '../../../mixins/cartMixin';
import ProductQuickView from '../../productoverview/ProductQuickView/ProductQuickView.vue';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    BasePrice,
    ProductQuickView,
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
    showModal() {
      this.$emit('showModal', { slug: this.currentProduct.slug, sku: this.matchingVariant.sku });
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
