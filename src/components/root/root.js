import { locale as loc } from '../common/shared';
import MiniCart from '../header/MiniCart/MiniCart.vue';
import config from '../../../sunrise.config';
// locale is an optional route parameter, if it's missing
// then see if it's set in store (local storage) and use that
// if it's not in store then default to en

const DEFAULT_COUNTRY = Object.keys(config.countries)[0];
const DEFAULT_LANGUAGE = Object.keys(config.countries)[0];
const checkLocale = (component) => {
  const { name, query, params } = component.$route;
  let newParams = params;
  if (!params.country) {
    const country = component?.$store?.state?.country || DEFAULT_COUNTRY;
    newParams = {
      ...newParams,
      country,
    };
  }
  if (!loc(component)) {
    const locale = component?.$store?.state?.locale || DEFAULT_LANGUAGE;
    newParams = {
      ...newParams,
      locale,
    };
  }
  if (params !== newParams) {
    component.$router.replace({
      name,
      query,
      params: newParams,
    });
  }
};
export default {
  components: {
    MiniCart,
  },
  computed: {
    locale() {
      return loc(this);
    },
    miniCartOpen() {
      return this.$store.state.miniCartOpen;
    },
  },
  methods: {
    close() {
      this.$store.dispatch('toggleMiniCart');
    },
    keyUpListener(e) {
      if (e.key === 'Escape') {
        this.$store.dispatch('closeMiniCart');
      }
    },
  },
  data() {
    return {
      sharedState: {
        expanded: false,
      },
    };
  },

  provide() {
    return {
      accordionItemState: this.sharedState,
    };
  },
  beforeCreate() {
    // when the page loads set store locale and country to what is in the url
    if (this?.$store?.state?.country !== this.$route.params.country) {
      this.$store.dispatch('setCountry', this.$route.params.country);
    }
    if (this?.$store?.state?.locale !== loc(this)) {
      this.$store.dispatch('setLocale', loc(this));
    }
    checkLocale(this);
  },
  beforeMount() {
    document.body.addEventListener('keyup', this.keyUpListener);
  },
  beforeDestroy() {
    document.body.removeEventListener('keyup', this.keyUpListener);
  },
  watch: {
    $route() {
      checkLocale(this);
    },
  },
};
