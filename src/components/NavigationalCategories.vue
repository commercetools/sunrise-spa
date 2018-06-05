<template>
  <ul class="nav navbar-nav">
    <li v-for="category1stLevel in categoryTree"
        :key="category1stLevel.id"
        class="dropdown menu-large">
      <router-link :to="{ name: 'products', params: { categorySlug: category1stLevel.slug } }"
         :class="{ 'icon-ribbon sale': isSale(category1stLevel) }"
         class="dropdown-toggle"
         data-toggle="dropdown">
        {{category1stLevel.name}}
        <img :alt="$t('main.more')"
             class="mobile-plus-content visible-xs"
             src="../assets/img/plus79.png"/>
      </router-link>
      <ul v-if="category1stLevel.children"
          class="dropdown-menu megamenu row dropdown-submenu">
        <li class="col-sm-8">
          <div class="nav-accordion">
            <div v-for="category2ndLevel in category1stLevel.children"
                 :key="category2ndLevel.id">
              <h3>
                <router-link :to="{ name: 'products', params: { categorySlug: category2ndLevel.slug } }">
                  {{category2ndLevel.name}}
                </router-link>
              </h3>
              <ul>
                <li v-for="category3rdLevel in category2ndLevel.children"
                    :key="category3rdLevel.id">
                  <router-link :to="{ name: 'products', params: { categorySlug: category3rdLevel.slug } }">
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
