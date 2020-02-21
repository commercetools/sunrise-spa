import gql from 'graphql-tag';
import { locale } from '../shared';

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
          locale: locale(this),
          where: `slug(${locale(this)}="${this.categorySlug}")`,
        };
      },
      skip: vm => !vm.categorySlug,
    },
  },
};
