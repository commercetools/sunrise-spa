<template>
  <div>
    <ol v-if="cat && category"
        class="breadcrumb">
      <li>
        <router-link to="/"
                     data-test="breadcrumb-home-link">
          {{ $t('home') }}
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
import gql from 'graphql-tag';

export default {
  props: ['categorySlug'],

  data: () => ({
    categories: null,
  }),

  computed: {
    category: vm => ((vm.categorySlug === 'all')
      ? { name: vm.$t('all'), slug: 'all' }
      : vm.categories.results[0]),
    cat: vm => ((vm.categorySlug === 'all')
      ? true
      : vm.categories),
  },

  apollo: {
    categories: {
      query: gql`
        query categories($locale: Locale!, $where: String) {
          categories(where: $where, limit: 1) {
            results {
              ...BreadcrumbCategoryInfo
              ancestors {
                ...BreadcrumbCategoryInfo
              }
            }
          }
        }
        fragment BreadcrumbCategoryInfo on Category {
          id
          name(locale: $locale)
          slug(locale: $locale)
        }`,
      variables() {
        return {
          locale: this.$store.state.locale,
          where: `slug(${this.$store.state.locale}="${this.categorySlug}")`,
        };
      },
      skip: vm => !vm.categorySlug,
    },
  },
};
</script>

<i18n>
en:
  home: "Home"
  all: 'All'
de:
  home: "Home"
  all: 'Alle'
</i18n>
