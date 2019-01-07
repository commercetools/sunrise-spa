const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD',
    },
  },
  'de-DE': {
    currency: {
      style: 'currency', currency: 'EUR', currencyDisplay: 'symbol',
    },
  },
};

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
      return numberFormats[this.$store.state.country].currency.currency;
    },
  },
};
