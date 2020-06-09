export default {
  props: {
    vuelidate: {
      type: Object,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    state: null,
    error: null,
  }),
  methods: {
    async submit() {
      this.vuelidate.$touch();
      this.error = null;
      if (!this.vuelidate.$invalid) {
        this.state = 'loading';
        await this.onSubmit()
          .then(() => {
            this.state = 'success';
          })
          .catch((error) => {
            this.error = error;
            this.state = null;
          });
      }
    },
  },
};
