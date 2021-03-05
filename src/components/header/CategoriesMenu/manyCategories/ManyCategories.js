import gql from "graphql-tag";
import { locale } from "../../../common/shared";

export default {
  data: () => ({
    categories: null,
    categorySlug: null,
  }),
  methods: {
    isActive(name) {
      // eslint-disable-next-line no-param-reassign
      name = name.toLowerCase();
      // eslint-disable-next-line no-useless-escape
      const regex = new RegExp(`^${name}*\w?`);
      return this.$route.params.categorySlug?.match(regex);
    },
  },
  computed: {
    sortedCategories() {
      const cat = this.categorySlug
        ? this.categories?.results?.[0]?.children
        : this.categories?.results;
      const ret =
        cat &&
        cat.sort((c1, c2) =>
          c1.orderHint.localeCompare(c2.orderHint)
        );
      return ret;
    },
  },
  watch: {
    $route: function(route) {
      this.categorySlug = route.params?.categorySlug;
    },
  },
  mounted() {
    this.categorySlug = this.$route.params?.categorySlug;
  },
  apollo: {
    categories: {
      query: gql`
        query categories(
          $locale: Locale!
          $where: String!
        ) {
          categories(
            limit: 10
            where: $where
            sort: "orderHint asc"
          ) {
            results {
              ...MenuCategoryInfo
              children {
                ...MenuCategoryInfo
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
          where: this?.categorySlug
            ? `slug(en="${this.categorySlug}")`
            : "parent is not defined",
        };
      },
    },
  },
};
