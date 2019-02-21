<template>
  <SelectBoxIt :options="sortOptions"
               v-model="sort"
               data-test="sort-selector"
               class="select"/>
</template>

<script>
export default {
  data: () => ({
    sort: null,
  }),

  computed: {
    sortOptions() {
      return [
        { id: null, name: this.$t('recommended') },
        { id: 'newest', name: this.$t('newest') },
        { id: 'oldest', name: this.$t('oldest') },
      ];
    },
  },

  methods: {
    changeSortParameter(value) {
      const query = { ...this.$route.query };
      if (value) {
        query.sort = value;
      } else {
        delete query.sort;
      }
      this.$router.replace({ query });
    },
  },

  created() {
    this.sort = this.$route.query.sort;
  },

  watch: {
    sort(newValue) {
      const sortCriteria = (sort) => {
        switch (sort) {
          case 'newest': return 'createdAt desc';
          case 'oldest': return 'createdAt asc';
          default: return null;
        }
      };
      this.$emit('changeSort', sortCriteria(newValue));
      this.changeSortParameter(newValue);
    },
  },
};
</script>

<i18n>
{
  "en": {
    "newest": "Newest",
    "oldest": "Oldest",
    "recommended": "Recommended"
  },
  "de": {
    "newest": "Neueste",
    "oldest": "Älteste",
    "recommended": "Empfohlen"
  }
}
</i18n>
