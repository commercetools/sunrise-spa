import gql from 'graphql-tag';
import { locale } from '../shared';

export default {
  props: ['categorySlug'],
  data: () => ({
    categories: null,
    currentCategory: null,
  }),
  watch: {
    categories() {
      this.currentCategory = (this.categorySlug === 'all')
        ? { name: this.$t('all'), slug: 'all', ancestors: [] }
        : (this.categorySlug === 'user') ? { name: this.$t('myAccount'), slug: 'account', ancestors: [] }
          : this.categories.results[0];
    },
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
