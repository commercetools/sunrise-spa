export default {
  props: {
    vuelidate: {
      type: Object,
      required: true,
    },
    customErrors: {
      type: Object,
      default() { return {}; },
    },
  },
  computed: {
    validations() {
      return Object.keys(this.vuelidate.$params);
    },
  },
  methods: {
    getErrorMessage(validation) {
      const customError = this.customErrors[validation];
      if (customError) {
        return customError;
      }
      const { type, ...args } = this.vuelidate.$params[validation];
      return this.$te(type) ? this.$t(type, args) : this.$t('unknownValidation');
    },
  },
};
