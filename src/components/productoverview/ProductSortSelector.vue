<template>
  <div>
    <label>{{ $t('sortBy') }}</label>
    <SelectBoxIt :options="sortOptions"
                 v-model="sort"
                 data-test="sort-selector"
                 class="sort-selector"/>
  </div>
</template>

<script>
import SelectBoxIt from '../common/form/SelectBoxIt.vue';

export default {
  components: {
    SelectBoxIt,
  },

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
      if (query.sort !== value) {
        if (value) {
          query.sort = value;
        } else {
          delete query.sort;
        }
        this.$router.replace({ query });
      }
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

<style scoped>
label {
  font-size: 0.9em;
  display: block;
  margin: 0;
  padding: 0;
  line-height: normal;
}

.sort-selector {
  background: #ffffff url("../../assets/img/arrow-67-filled.png") no-repeat 90% 50%;
  background-size: 12px;
  color: #333333;
  padding-right: 10px;
  border: 1px solid #D6D6D6;
}
</style>

<i18n>
en:
  sortBy: "Sort by"
  newest: "Newest"
  oldest: "Oldest"
  recommended: "Recommended"
de:
  sortBy: "Sortieren nach"
  newest: "Neueste"
  oldest: "Älteste"
  recommended: "Empfohlen"
</i18n>
