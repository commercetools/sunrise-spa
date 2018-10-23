export default {
  methods: {
    formatPrice(price) {
      const priceAmount = this.calculatePriceAmount(price);
      return this.$n(priceAmount, 'currency', this.$store.state.country);
    },

    calculatePriceAmount({ centAmount, fractionDigits }) {
      return centAmount / (10 ** fractionDigits);
    },
  },

  computed: {
    currency() {
      return this.$i18n.numberFormats[this.$store.state.country].currency.currency;
    },
  },
};
