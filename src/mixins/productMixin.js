export default {
  computed: {
    currentProduct() {
      return this.product.masterData.current || {};
    },

    hasPrice() {
      return this.matchingVariant.price;
    },
  },
};
