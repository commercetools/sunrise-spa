export default {
  computed: {
    step() {
      switch (this.$route.name) {
        case 'checkout-payment-method': return 2;
        case 'checkout-order': return 3;
        default: return 1;
      }
    },
  },
  methods: {
    isActive(current, step) {
      return { active: current === step };
    },
  },
};
