import SelectBoxIt from '../../common/form/SelectBoxIt/index.vue';
import { locale } from '../../common/shared';

export default {
  components: {
    SelectBoxIt,
  },
  data: () => ({
    show: false,
    closeTimer: null,
  }),
  computed: {
    country: {
      get() {
        return this.$store.state.country;
      },
      set(value) {
        this.$store.dispatch('setCountry', value);
      },
    },
    language: {
      get() {
        return locale(this);
      },
      set(value) {
        this.$store.dispatch('setLocale', value);
        this.$router.replace({
          ...this.$route,
          params: {
            ...this.$route.params,
            locale: value,
          },
        });
      },
    },
    languages() {
      const configLangs = this.$sunrise.languages;
      const langs = configLangs ? Object.entries(configLangs) : [];
      return langs.map(([id, name]) => ({ id, name }));
    },
    countries() {
      const configCountries = this.$sunrise.countries;
      const countries = configCountries ? Object.entries(configCountries) : [];
      return countries.map(([id, name]) => ({ id, name }));
    },
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    open() {
      this.closeTimer = setTimeout(() => {
        this.show = false;
      }, 300);
    },
    close() {
      clearTimeout(this.closeTimer);
    },
  },
};
