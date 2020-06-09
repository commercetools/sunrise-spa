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
    pages() {
      const last = Math.ceil(this.page / 3) * 3;
      const total = this.totalPages;
      return [last - 2, last - 1, last].filter(
        page => page < total,
      );
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
    goToPage(page) {
      this.$emit('pagechanged', page);
    },
    isCurrentPage(page) {
      return page === this.page;
    },
  },
};
