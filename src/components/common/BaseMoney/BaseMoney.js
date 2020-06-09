export default {
  props: {
    money: Object,
  },
  computed: {
    formattedMoney() {
      const countryIsNotCurrency = {
        USD: 'US',
        EUR: 'DE',
      };
      return this.$n(this.amount, 'currency', countryIsNotCurrency[this.currency]);
    },
    amount() {
      if (this.money) {
        return this.money.centAmount / (10 ** this.money.fractionDigits);
      }
      return 0;
    },
    currency() {
      if (this.money) {
        return this.money.currencyCode;
      }
      return '';
    },

  },
};
