export default {
  data: () => ({
    paymentMethod: 'card',
  }),
  methods: {
    setPaymentMethod() {
      // TODO create payment and add it to the cart, but missing CreateMyPayment mutation
      // return this.updateMyCart([
      //   {
      //     addPayment: {
      //       payment: {
      //         typeId: 'payment',
      //         id: paymentId
      //       },
      //     },
      //   },
      // ]).then(() => this.$router.push({ name: 'checkout-confirmation' }));
      return Promise.resolve(this.$router.push({ name: 'checkout-order' }));
    },
  },
};
