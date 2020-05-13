import CategoriesMenu from '../CategoriesMenu/index.vue';
import LoginButton from '../LoginButton/index.vue';
import MiniCart from '../MiniCart/index.vue';

export default {
  components: {
    CategoriesMenu,
    LoginButton,
    MiniCart,
  },
  data() {
    return {
      searchText: this.$route.query.q || '',
      mobileMenuOpen: false,
      searchOpen: false,
    };
  },
  methods: {
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
    },
    search() {
      this.toggleSearch();
      const {
        query,
      } = this.$route;
      this.$router.push({
        name: 'products',
        params: {
          categorySlug: 'all',
          page: 1,
        },
        query: {
          ...query,
          q: this.searchText,
        },
      });
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    onToggleMinicart() {
      this.$store.dispatch('toggleMiniCart');
    },
  },
  watch: {
    $route(to) {
      this.searchText = to.query.q || '';
    },
  },
};
