import gql from 'graphql-tag';
import { locale, isToughDevice } from '../../common/shared';

const minus = require('@/assets/img/minus-1.png');
const plus = require('@/assets/img/plus79.png');

export default {
  props: {
    openMobile: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    categories: null,
    openCategoryMenu: '',
    someCategoryWasClicked: false,
  }),
  methods: {
    mobileImage(level) {
      return this.isMenuOpen(level)
        ? minus
        : plus;
    },
    isSale({ externalId }) {
      const categoriesConfig = this.$sunrise.categories;
      return categoriesConfig ? externalId === categoriesConfig.salesExternalId : false;
    },
    isMenuOpen({ id }) {
      return (isToughDevice() || !this.someCategoryWasClicked) && this.openCategoryMenu === id;
    },
    hoverOnCategory({ id, children }) {
      if (isToughDevice()) {
        return;
      }
      const hasChildren = Array.isArray(children) && children.length;
      if (hasChildren) {
        this.openCategoryMenu = id;
      }
      this.someCategoryWasClicked = false;
    },
    hoverOffCategory() {
      if (isToughDevice()) {
        return;
      }
      this.openCategoryMenu = false;
    },
    toggleOpenCategory({ id }) {
      this.openCategoryMenu = id === this.openCategoryMenu
        ? false
        : id;
    },
    clickOnCategory() {
      this.someCategoryWasClicked = true;
      this.openCategoryMenu = false;
      this.$emit('closeMobile');
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
