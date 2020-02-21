import { locale as loc } from '../common/shared';
// locale is an optional route parameter, if it's missing
// then see if it's set in store (local storage) and use that
// if it's not in store then default to en
const checkLocale = (component) => {
  const { name, query, params } = component.$route;
  if (!loc(component)) {
    const locale = component?.$store?.state?.locale || 'en';
    component.$router.replace({
      name,
      query,
      params: {
        ...params,
        locale,
      },
    });
  }
};
export default {
  data() {
    return {
      lastLocale: null,
    };
  },
  beforeCreate() {
    // when the page loads set store locale to what is in the url
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
