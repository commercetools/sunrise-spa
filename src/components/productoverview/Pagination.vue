<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button"
              @click="onClickPreviousPage"
              :disabled="isInFirstPage"
              aria-label="Go to previous page">
        Previous
      </button>
    </li>

    <li class="pagination-item">
      <button type="button"
              @click="onClickNextPage"
              :disabled="isInLastPage"
              aria-label="Go to next page">
        Next
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    products: {
      type: Object,
      required: true,
    },
    offset: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    totalProducts: {
      type: Number,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
  }),

  computed: {
    isInFirstPage() {
      return this.currentPage === 0;
    },
    isInLastPage() {
      return this.currentPage >= this.pageCount - 1;
    },

    pageCount() {
      const productListLength = this.totalProducts;
      const pageLimit = this.limit;
      return Math.ceil(productListLength / pageLimit);
    },
  },

  methods: {
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
  },
};
</script>
