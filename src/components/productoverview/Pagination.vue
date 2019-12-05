<template>
  <ul data-test="pagination"
      class="pagination">
    <li class="pagination-item"
        data-test="paginate-prev">
      <button type="button"
              class="icon-prev"
              @click="previousPage"
              :disabled="isInFirstPage"
              aria-label="Go to previous page">
      </button>
    </li>

    <span>
      {{ $t('page') }} {{page}} {{ $t('of') }} {{totalPages}}
    </span>

    <li class="pagination-item"
        data-test="paginate-next">
      <button type="button"
              class="icon-next"
              @click="nextPage"
              :disabled="isInLastPage"
              aria-label="Go to next page">
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
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
  },

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
</script>

<i18n>
  en:
    page: "Page"
    of: "of"
  de:
    page: "Seite"
    of: "von"
</i18n>
