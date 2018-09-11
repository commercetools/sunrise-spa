<template>
  <transition name="fade">
    <ul v-if="!loading && hasCategories"
        class="nav navbar-nav">
      <li v-for="category1stLevel in categoryTree"
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
          <img :alt="$t('more')"
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
            <img :alt="$t('teaser')"
                 src="../assets/img/menu-teaser.jpg"
                 class="img-responsive megamenu-img">
          </li>
        </ul>
      </li>
    </ul>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      openCategoryMenu: '',
      someCategoryWasClicked: false,
    };
  },

  computed: {
    ...mapGetters(['categoryTree', 'hasCategories']),

    loading() {
      return this.$apollo.queries.categories && this.$apollo.queries.categories.loading;
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
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "more": "More",
    "teaser": "Summer 2015 – What inspires you?"
  },
  "de": {
    "more": "Mehr",
    "teaser": "Sommer 2015 – Was ist Ihre Inspiration?"
  }
}
</i18n>
