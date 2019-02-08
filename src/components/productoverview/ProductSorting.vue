<template>
    <select name="sort" id="sort" v-model="sortBy" v-on:change="sort(sortBy)">
        <option selected="selected" value="">--</option>
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

  methods: {
    sort(sortBy) {
      if (sortBy === 'newest') {
        this.$router.replace({ name: 'products', query: { sort: 'newest' } });
      } else if (sortBy === 'oldest') {
        this.$router.replace({ name: 'products', query: { sort: 'oldest' } });
      } else {
        this.$router.replace('');
      }
    },
  },
};
</script>

<i18n>
{
  "en": {
    "priceDesc": "Price: Descending",
    "priceAsc": "Price: Ascending"
  },
  "de": {
    "priceDesc": "Preis absteigend",
    "priceAsc": "Preis aufsteigend"
  }
}
</i18n>
