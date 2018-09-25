export default {
  methods: {
    categoryBySlug(slug) {
      return this.$store.getters.categoryBySlug[slug];
    },
  },
};
