<template>
  <ul v-if="active"
      data-test="categories-1st-level"
      class="nav navbar-nav">
    <li v-for="category1stLevel in categories.results"
        :key="category1stLevel.id"
        @mouseover="hoverOnCategory(category1stLevel)"
        @mouseleave="hoverOffCategory()"
        class="dropdown menu-large">
      <router-link :to="{ name: 'products', params: { categorySlug: category1stLevel.slug } }"
                   @click.native="clickOnCategory()"
                   :class="{ 'icon-ribbon sale': isSale(category1stLevel) }"
                   class="dropdown-toggle">
        {{category1stLevel.name}}
        <img :alt="$t('main.more')"
             class="mobile-plus-content visible-xs"
             src="../assets/img/plus79.png"/>
      </router-link>
      <ul v-if="isMenuOpen(category1stLevel)"
          data-test="categories-2nd-level"
          class="dropdown-menu megamenu row dropdown-submenu">
        <li class="col-sm-8">
          <div class="nav-accordion">
            <div v-for="category2ndLevel in category1stLevel.children"
                 :key="category2ndLevel.id">
              <h3 data-test="category-2nd-level-name">
                <router-link :to="{ name: 'products', params: { categorySlug: category2ndLevel.slug } }"
                             @click.native="clickOnCategory()">
                  {{category2ndLevel.name}}
                </router-link>
              </h3>
              <ul data-test="categories-3rd-level">
                <li v-for="category3rdLevel in category2ndLevel.children"
                    :key="category3rdLevel.id">
                  <router-link :to="{ name: 'products', params: { categorySlug: category3rdLevel.slug } }"
                               @click.native="clickOnCategory()">
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
      return Object.keys(this.categories).length > 0;
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
      this.$store.dispatch('setCategories', categories);
    },
  },

  apollo: {
    categories: {
      query: gql`
        query fetchAllCategories($locale: Locale!) {
          categories(limit: 10, where: "parent is not defined", sort: "orderHint asc") {
            total
            count
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
