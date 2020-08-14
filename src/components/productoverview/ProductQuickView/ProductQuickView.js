export default {
  props: {
    openModal: Boolean,
    productSlug: String,
    productSku: String,

  },
  watch: {
    openModal() {
      if (this.openModal === true) {
        this.$modal.show('quickView');
      }
    },
  },
  methods: {
    showModal() {
      this.$modal.show('quickView');
    },
  },
};
