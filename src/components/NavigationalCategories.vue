<template>
  <ul id="nav-categories-menu"
      class="nav navbar-nav categories-1st-level">
    <li v-for="category1stLevel in categoryTree"
        :key="category1stLevel.id"
        @mouseover="openMenu(category1stLevel)"
        @mouseleave="closeMenu()"
        class="dropdown menu-large">
      <router-link :to="{ name: 'products', params: { categorySlug: category1stLevel.slug } }"
                   @click.native="selectCategory()"
                   :class="{ 'icon-ribbon sale': isSale(category1stLevel) }"
                   class="dropdown-toggle"
                   data-toggle="dropdown">
        {{category1stLevel.name}}
        <img :alt="$t('main.more')"
             class="mobile-plus-content visible-xs"
             src="../assets/img/plus79.png"/>
      </router-link>
      <ul v-if="isSubmenuVisible(category1stLevel)"
          class="dropdown-menu megamenu row dropdown-submenu categories-2nd-level">
        <li class="col-sm-8">
          <div class="nav-accordion">
            <div v-for="category2ndLevel in category1stLevel.children"
                 :key="category2ndLevel.id">
              <h3>
                <router-link :to="{ name: 'products', params: { categorySlug: category2ndLevel.slug } }"
                             @click.native="selectCategory()">
                  {{category2ndLevel.name}}
                </router-link>
              </h3>
              <ul class="categories-3rd-level">
                <li v-for="category3rdLevel in category2ndLevel.children"
                    :key="category3rdLevel.id">
                  <router-link :to="{ name: 'products', params: { categorySlug: category3rdLevel.slug } }"
                               @click.native="selectCategory()">
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
      submenuVisible: '',
      categoryWasClicked: false,
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

    isSubmenuVisible(category) {
      const hasChildren = Array.isArray(category.children) && category.children.length;
      return hasChildren && category.id === this.submenuVisible && !this.categoryWasClicked;
    },

    openMenu(rootCategory) {
      this.submenuVisible = rootCategory.id;
      this.categoryWasClicked = false;
    },

    closeMenu() {
      this.submenuVisible = '';
    },

    selectCategory() {
      this.categoryWasClicked = true;
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
