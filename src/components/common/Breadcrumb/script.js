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
