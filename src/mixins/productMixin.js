export default {
  computed: {
    currentProduct() {
      return this.product.masterData.current || {};
    },

    hasPrice() {
      return this.matchingVariant.price;
    },
  },

  methods: {
    displayedImageUrl(variant) {
      if (Array.isArray(variant.images) && variant.images.length) {
        return variant.images[0].url;
      }
      return null;
    },
  },
};
