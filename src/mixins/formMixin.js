export default {
  data: () => ({
    buttonState: null,
    serverError: null,
  }),

  computed: {
    formIsClean() {
      return !this.$v.$anyDirty;
    },
  },

  methods: {
    async submit(onValid) {
      this.$v.$touch();
      this.serverError = null;
      if (!this.$v.$invalid) {
        this.buttonState = 'loading';
        await onValid()
          .then(() => {
            this.buttonState = 'success';
          }).catch((error) => {
            this.serverError = error;
            this.buttonState = null;
          });
      }
    },
  },
};
