export default {
  computed: {
    priceAmount() {
      const { price } = this.product.masterData.current.masterVariant;
      if (price) {
        return price.value.centAmount / (10 ** price.value.fractionDigits);
      }
      return false;
    },
    currencyCode() {
      return this.product.masterData.current.masterVariant.price.value.currencyCode;
    },
  },
};
