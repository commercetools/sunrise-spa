<template>
  <div>
    <ol v-if="category"
        class="breadcrumb">
      <li>
        <router-link to="/"
                     data-test="breadcrumb-home-link">
          {{ $t('main.home') }}
        </router-link>
      </li>
      <li v-for="ancestor in category.ancestors"
          :key="ancestor.id">
        <router-link :to="{ name: 'products', params: { categorySlug: ancestor.slug } }"
                     data-test="breadcrumb-ancestor-link">
          {{ ancestor.name }}
        </router-link>
      </li>

      <li class="active">
        <router-link :to="{ name: 'products', params: { categorySlug: category.slug } }"
                     data-test="breadcrumb-category-link"
                     class="active">
          {{ category.name }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: ['categorySlug'],

  computed: {
    category() {
      return this.$store.state.categories.dataBySlug[this.categorySlug];
    },
  },
};
</script>
