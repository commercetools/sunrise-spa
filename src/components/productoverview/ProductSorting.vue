<template>
    <select data-test="sorting-select"
            name="sort"
            id="sort"
            v-model="sortBy">
        <option value="">--</option>
        <option value="newest">{{ $t('newest') }}</option>
        <option value="oldest">{{ $t('oldest') }}</option>
    </select>
</template>

<script>
export default {
  data: () => ({
    sortBy: '',
  }),
  created() {
    this.sortBy = this.$route.query.sort || '';
  },

  watch: {
    sortBy(sortBy) {
      if (sortBy.length > 0) {
        this.$router.replace({ query: { ...this.$route.query, sort: sortBy } });
      } else {
        const query = Object.assign({}, this.$route.query);
        delete query.sort;
        this.$router.replace({ query });
      }
    },
  },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "newest": "Newest",
    "oldest": "Oldest"
  },
  "de": {
    "newest": "Neueste",
    "oldest": "Älteste"
  }
}
</i18n>
