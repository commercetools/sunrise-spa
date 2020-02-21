import SelectBoxIt from '../../common/form/SelectBoxIt/index.vue';

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
          case 'newest': return 'lastModifiedAt desc';
          case 'oldest': return 'lastModifiedAt asc';
          default: return null;
        }
      };
      this.$emit('changeSort', sortCriteria(newValue));
      this.changeSortParameter(newValue);
    },
  },
};
