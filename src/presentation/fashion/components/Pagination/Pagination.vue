<style src="./Pagination.scss" lang="scss"></style>
<i18n src="./Pagination.txt" lang="yaml"></i18n>
<script src="./Pagination.js"></script>

<template>
  <div
    class="pro-pagination-style text-center"
    data-test="pagination"
    v-if="show"
  >
    <ul>
      <li data-test="paginate-prev" v-if="!isInFirstPage">
        <a
          class="next"
          href
          data-test="previous-page-link"
          @click.prevent="previousPage"
          aria-label="Go to previous page"
          >{{ t('previous') }}</a
        >
      </li>
      <li v-for="page in pages" v-bind:key="page">
        <a
          v-bind:class="{ active: isCurrentPage(page) }"
          @click.prevent="() => goToPage(page)"
          >{{ page }}</a
        >
      </li>
      <li v-if="!isInLastPage">
        <a
          class="next"
          href
          data-test="next-page-link"
          @click.prevent="nextPage"
          aria-label="Go to next page"
          >{{ t('next') }}</a
        >
      </li>
    </ul>
  </div>
</template>
