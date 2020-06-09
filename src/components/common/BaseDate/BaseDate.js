export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return this.$d(new Date(this.date), this.format, this.$store.state.country);
    },
  },
};
