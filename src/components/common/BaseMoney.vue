<template>
  <span>
    {{ formattedMoney }}
  </span>
</template>

<script>
export default {
  props: {
    money: {
      type: Object,
      required: true,
    },
  },

  computed: {
    formattedMoney() {
      return this.$n(this.amount, 'currency', this.$store.state.country);
    },

    amount() {
      return this.money.centAmount / (10 ** this.money.fractionDigits);
    },
  },
};
</script>
