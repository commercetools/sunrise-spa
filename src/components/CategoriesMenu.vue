<template>
  <ul id="nav-categories-menu"
      class="nav navbar-nav categories-1st-level">
    <li v-for="category1stLevel in categoryTree"
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
          class="dropdown-menu megamenu row dropdown-submenu categories-2nd-level">
        <li class="col-sm-8">
          <div class="nav-accordion">
            <div v-for="category2ndLevel in category1stLevel.children"
                 :key="category2ndLevel.id">
              <h3>
                <router-link :to="{ name: 'products', params: { categorySlug: category2ndLevel.slug } }"
                             @click.native="clickOnCategory()">
                  {{category2ndLevel.name}}
                </router-link>
              </h3>
              <ul class="categories-3rd-level">
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
export default {
  data() {
    return {
      loading: false,
      openCategoryMenu: '',
      someCategoryWasClicked: false,
    };
  },

  created() {
    this.loadCategories();
  },

  computed: {
    categoryTree() {
      return this.$store.state.categories.items;
    },

    locale() {
      return this.$i18n.locale;
    },
  },

  methods: {
    isSale(category) {
      const categoriesConfig = this.$config.categories;
      return categoriesConfig ? category.externalId === categoriesConfig.salesExternalId : false;
    },

    isMenuOpen(category) {
      return !this.someCategoryWasClicked && this.openCategoryMenu === category.id;
    },

    hoverOnCategory(category) {
      const hasChildren = Array.isArray(category.children) && category.children.length;
      if (hasChildren) {
        this.openCategoryMenu = category.id;
      }
      this.someCategoryWasClicked = false;
    },

    hoverOffCategory() {
      this.openCategoryMenu = '';
    },

    clickOnCategory() {
      this.someCategoryWasClicked = true;
    },

    loadCategories() {
      this.loading = true;
      this.$store.dispatch('fetchCategories', this.$i18n.locale)
        .then(() => {
          this.loading = false;
        });
    },
  },

  watch: {
    locale() {
      this.loadCategories();
    },
  },
};
</script>
