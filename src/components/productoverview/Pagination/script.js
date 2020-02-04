export default {
  props: ['products', 'offset', 'limit', 'totalProducts', 'page'],
  computed: {
    totalPages() {
      const productListLength = this.totalProducts;
      const pageLimit = this.limit;
      return Math.ceil(productListLength / pageLimit);
    },
    isInFirstPage() {
      return this.page === 1;
    },
    isInLastPage() {
      return this.page > this.totalPages - 1;
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
