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
  computed: {
    currency() {
      return numberFormats[this.$store.state.country].currency.currency;
    },
  },
};
