export default {
  props: ['pageSize', 'total', 'page'],
  computed: {
    totalPages() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    isInFirstPage() {
      return this.page === 1;
    },
    isInLastPage() {
      return this.page > this.totalPages - 1;
    },
    show() {
      return this.totalPages > 1;
    },
  },
  methods: {
    nextPage() {
      this.$emit('pagechanged', this.page + 1);
    },
    previousPage() {
      this.$emit('pagechanged', this.page - 1);
    },
  },
};
