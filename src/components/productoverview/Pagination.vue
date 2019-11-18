<template>
  <ul v-if="pageCount > 1"
      class="pagination">
    <li class="pagination-item prev-step">
      <button type="button"
              @click="onClickPreviousPage"
              :disabled="isInFirstPage"
              aria-label="Go to previous page">
        &#8249;
      </button>
    </li>
    <li class="pagination-item next-step">
      <button type="button"
              @click="onClickNextPage"
              :disabled="isInLastPage"
              aria-label="Go to next page">
        &#8250;
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

  computed: {
    pageCount() {
      const productListLength = this.totalProducts;
      const pageLimit = this.limit;
      return Math.ceil(productListLength / pageLimit);
    },
    isInFirstPage() {
      return this.currentPage === 0;
    },
    isInLastPage() {
      return this.currentPage >= this.pageCount - 1;
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
