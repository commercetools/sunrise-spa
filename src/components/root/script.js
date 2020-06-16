import { locale as loc } from '../common/shared';

let preview = false;
// locale is an optional route parameter, if it's missing
// then see if it's set in store (local storage) and use that
// if it's not in store then default to en
const checkLocale = (component) => {
  const { name, query, params } = component.$route;
  let newParams = params;
  let newQuery = query;
  if (query.preview) {
    preview = true;
  }
  if (preview && !query.preview) {
    newQuery = {
      ...query,
      preview: true,
    };
  }
  if (!params.country) {
    const country = component?.$store?.state?.country || 'DE';
    newParams = {
      ...newParams,
      country,
    };
  }
  if (!loc(component)) {
    const locale = component?.$store?.state?.locale || 'en';
    newParams = {
      ...newParams,
      locale,
    };
  }
  if (params !== newParams || query !== newQuery) {
    component.$router.replace({
      name,
      query: newQuery,
      params: newParams,
    });
  }
};
export default {
  computed: {
    locale() {
      return loc(this);
    },
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
  watch: {
    $route() {
      checkLocale(this);
    },
  },
};
