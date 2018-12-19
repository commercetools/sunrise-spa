export default {
  computed: {
    currentProduct() {
      return this.product.masterData.current || {};
    },

    hasPrice() {
      return this.matchingVariant.price;
    },

    hasDiscount() {
      return this.matchingVariant.price.discounted;
    },

    discountedPrice() {
      return this.matchingVariant.price.discounted.value;
    },

    originalPrice() {
      return this.matchingVariant.price.value;
    },
  },
};
