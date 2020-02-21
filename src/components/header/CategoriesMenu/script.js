import gql from 'graphql-tag';
import { locale } from '../../common/shared';

export default {
  data: () => ({
    categories: null,
    openCategoryMenu: '',
    someCategoryWasClicked: false,
  }),
  methods: {
    isSale({ externalId }) {
      const categoriesConfig = this.$sunrise.categories;
      return categoriesConfig ? externalId === categoriesConfig.salesExternalId : false;
    },
    isMenuOpen({ id }) {
      return !this.someCategoryWasClicked && this.openCategoryMenu === id;
    },
    hoverOnCategory({ id, children }) {
      const hasChildren = Array.isArray(children) && children.length;
      if (hasChildren) {
        this.openCategoryMenu = id;
      }
      this.someCategoryWasClicked = false;
    },
    hoverOffCategory() {
      this.openCategoryMenu = '';
    },
    clickOnCategory() {
      this.someCategoryWasClicked = true;
    },
  },
  apollo: {
    categories: {
      query: gql`
        query categories($locale: Locale!) {
          categories(limit: 10, where: "parent is not defined", sort: "orderHint asc") {
            results {
            ...MenuCategoryInfo
              children {
              ...MenuCategoryInfo
                children {
                ...MenuCategoryInfo
                }
              }
            }
          }
        }
        fragment MenuCategoryInfo on Category {
          id
          externalId
          name(locale: $locale)
          slug(locale: $locale)
        }`,
      variables() {
        return {
          locale: locale(this),
        };
      },
    },
  },
};
