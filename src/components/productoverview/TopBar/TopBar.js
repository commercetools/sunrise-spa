/* eslint-disable no-param-reassign */
export default {
  props: ['show', 'sort', 'offset', 'count', 'total'],
  components: {
  },
  data() {
    return {
      sortItems: [{ id: null, name: this.$t('recommended') },
        { id: 'newest', name: this.$t('newest') },
        { id: 'oldest', name: this.$t('oldest') }],
    };
  },
  computed: {
  },
  methods: {
    toggleFilter(e) {
      this.$emit('toggleFilter', e);
    },
    changeSort(sort) {
      this.$emit('changeSort', sort);
    },
  },
  watch: {
  },
};
