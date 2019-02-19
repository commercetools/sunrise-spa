<template>
    <select data-test="sorting-select" name="sort" id="sort" v-model="sortBy">
        <option value="">--</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
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
        this.$router.replace({ query: { sort: sortBy } });
      } else {
        this.$router.replace('');
      }
    },
  },
};
</script>
