import gql from "graphql-tag";
import {
  locale,
  isToughDevice,
} from "../../../common/shared";

const minus = require("@/assets/img/minus-1.png");
const plus = require("@/assets/img/plus79.png");

export default {
  props: {
    openMobile: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    categories: null,
    openCategoryMenu: "",
    someCategoryWasClicked: false,
  }),

  methods: {
    mobileImage(level) {
      return this.isMenuOpen(level) ? minus : plus;
    },
    isActive(name) {
      // eslint-disable-next-line no-param-reassign
      name = name.toLowerCase();
      // eslint-disable-next-line no-useless-escape
      const regex = new RegExp(`^${name}*\w?`);
      return this.$route.params.categorySlug?.match(regex);
    },
    isSale({ externalId }) {
      const categoriesConfig = this.$sunrise.categories;
      return categoriesConfig
        ? externalId === categoriesConfig.salesExternalId
        : false;
    },
    isMenuOpen({ id }) {
      return (
        (isToughDevice() || !this.someCategoryWasClicked) &&
        this.openCategoryMenu === id
      );
    },
    hoverOnCategory({ id, children }) {
      if (isToughDevice()) {
        return;
      }
      const hasChildren =
        Array.isArray(children) && children.length;
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
      this.openCategoryMenu =
        id === this.openCategoryMenu ? false : id;
    },
    clickOnCategory() {
      this.someCategoryWasClicked = true;
      this.openCategoryMenu = false;
    },
  },
  computed: {
    sortedCategories() {
      const recurSort = (categories) =>
        categories
          .map((category) =>
            category.children
              ? {
                  ...category,
                  children: recurSort(category.children),
                }
              : category
          )
          .sort((c1, c2) =>
            c1.orderHint.localeCompare(c2.orderHint)
          );
      return (
        this.categories &&
        recurSort(this.categories.results)
      );
    },
  },
  apollo: {
    categories: {
      query: gql`
        query categories($locale: Locale!) {
          categories(
            limit: 10
            where: "parent is not defined"
            sort: "orderHint asc"
          ) {
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
          orderHint
        }
      `,
      variables() {
        return {
          locale: locale(this),
        };
      },
    },
  },
};
