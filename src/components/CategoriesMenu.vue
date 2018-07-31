<template>
  <ul v-if="active"
      class="nav navbar-nav">
    <li v-for="category1stLevel in categories.results"
        :key="category1stLevel.id"
        @mouseover="hoverOnCategory(category1stLevel)"
        @mouseleave="hoverOffCategory()"
        data-test="category-1st-level"
        class="dropdown menu-large">
      <router-link :to="{ name: 'products', params: { categorySlug: category1stLevel.slug } }"
                   @click.native="clickOnCategory()"
                   data-test="category-1st-level-link"
                   :class="{ 'icon-ribbon sale': isSale(category1stLevel) }"
                   class="dropdown-toggle">
        {{category1stLevel.name}}
        <img :alt="$t('main.more')"
             class="mobile-plus-content visible-xs"
             src="../assets/img/plus79.png"/>
      </router-link>
      <ul v-if="isMenuOpen(category1stLevel)"
          class="dropdown-menu megamenu row dropdown-submenu">
        <li class="col-sm-8">
          <div class="nav-accordion">
            <div v-for="category2ndLevel in category1stLevel.children"
                 :key="category2ndLevel.id">
              <h3>
                <router-link :to="{ name: 'products', params: { categorySlug: category2ndLevel.slug } }"
                             @click.native="clickOnCategory()"
                             data-test="category-2nd-level-link">
                  {{category2ndLevel.name}}
                </router-link>
              </h3>
              <ul>
                <li v-for="category3rdLevel in category2ndLevel.children"
                    :key="category3rdLevel.id">
                  <router-link :to="{ name: 'products', params: { categorySlug: category3rdLevel.slug } }"
                               @click.native="clickOnCategory()"
                               data-test="category-3rd-level-link">
                    {{category3rdLevel.name}}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="col-sm-4 hidden-xs">
          <img :alt="$t('main.header.teaser')"
               src="../assets/img/menu-teaser.jpg"
               class="img-responsive megamenu-img">
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      openCategoryMenu: '',
      someCategoryWasClicked: false,
      categories: {},
    };
  },

  computed: {
    active() {
      return Array.isArray(this.categories.results) && this.categories.results.length > 0;
    },
  },

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

  watch: {
    categories(categories) {
      const categoryItems = Array.isArray(categories.results) ? categories.results : [];
      this.$store.dispatch('setCategories', categoryItems);
    },
  },

  apollo: {
    categories: {
      query: gql`
        query fetchAllCategories($locale: Locale!) {
          categories(limit: 10, where: "parent is not defined", sort: "orderHint asc") {
            results {
              ...printCategory
              children {
                ...printCategory
                children {
                  ...printCategory
                }
              }
            }
          }
        }

        fragment printCategory on Category {
          id
          externalId
          name(locale: $locale)
          slug(locale: $locale)
          ancestors {
            name(locale: $locale)
            slug(locale: $locale)
          }
        }`,
      variables() {
        return {
          locale: this.$i18n.locale,
        };
      },
    },
  },
};
</script>
