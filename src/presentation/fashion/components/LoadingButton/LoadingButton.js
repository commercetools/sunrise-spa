export default {
  props: {
    state: {
      type: String,
      validator: (value) => ['success', 'loading'].includes(value),
    },
  },
  data: () => ({
    formState: null,
  }),
  watch: {
    state(newState) {
      this.formState = newState;
      if (newState === 'success') {
        setTimeout(() => {
          this.formState = null;
          this.$emit('reset');
        }, 2000);
      }
    },
  },
};
