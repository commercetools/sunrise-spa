export default {
  data: () => ({
    paymentMethod: "card",
  }),
  mounted() {
    this.$emit("card-paid");
  },
};
