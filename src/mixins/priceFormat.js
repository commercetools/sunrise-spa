export default {
  methods: {
    formatPrice({ centAmount, fractionDigits }) {
      const priceAmount = centAmount / (10 ** fractionDigits);
      return this.$n(priceAmount, 'currency', this.$store.state.country);
    },
  },
};
