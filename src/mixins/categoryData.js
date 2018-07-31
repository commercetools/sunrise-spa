export default {
  methods: {
    categoryBySlug(slug) {
      return this.$store.state.categories.dataBySlug[slug];
    },
  },
};
