import CategoriesMenu from '../CategoriesMenu/CategoriesMenu.vue';
import LoginButton from '../LoginButton/LoginButton.vue';
import LocationSelector from '../LocationSelector/LocationSelector.vue';
import MiniCart from '../MiniCart/MiniCart.vue';
import cartMixin from '../../../mixins/cartMixin';

export default {
  components: {
    CategoriesMenu,
    LoginButton,
    MiniCart,
    LocationSelector,
  },
  data() {
    return {
      searchText: this.$route.query.q || '',
      mobileMenuOpen: false,
      searchOpen: false,
    };
  },
  mixins: [cartMixin],
  computed: {
    totalCartItems() {
      return this.$store.state.cartItems;
    },
    showLocationSelector() {
      return !this.me?.activeCart;
    },
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
    openMiniCart() {
      this.$store.dispatch('openMiniCart', 0);
    },
  },
  watch: {
    $route(to) {
      this.searchText = to.query.q || '';
    },
  },
};
