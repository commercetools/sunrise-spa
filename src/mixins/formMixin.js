export default {
  data: () => ({
    buttonState: null,
    serverError: null,
  }),

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
