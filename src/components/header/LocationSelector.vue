<template>
  <li v-if="languages.length || countries.length"
      @mouseleave="open"
      @mouseenter="close"
      data-test="location-selector"
      class="list-item-location clearfix">
    <button @click="toggle"
            data-test="location-selector-open-button">
      <img class="pull-right"
           src="../../assets/img/globe-2.png"
           :alt="$t('location')">
    </button>
    <transition name="fade">
      <div v-if="show"
           class="location-dropdown">
        <div v-if="languages.length">
          <span class="location-dropdown-label">
            {{ $t('language') }}
          </span>
          <SelectBoxIt v-model="language"
                       :options="languages"
                       id="language"
                       data-test="language-selector-dropdown"
                       class="select location-select"
                       @input="toggle"/>
        </div>
        <div v-if="countries.length">
          <span class="location-dropdown-label">
            {{ $t('country') }}
          </span>
          <SelectBoxIt v-model="country"
                       :options="countries"
                       id="country-select"
                       data-test="country-selector-dropdown"
                       class="select location-select"
                       @input="toggle"/>
        </div>
      </div>
    </transition>
  </li>
</template>

<script>
import SelectBoxIt from '../common/form/SelectBoxIt.vue';

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
        return this.$store.state.locale;
      },
      set(value) {
        this.$store.dispatch('setLocale', value);
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
</script>

<i18n>
en:
  location: "Location"
  language: "Language"
  country: "Country"
de:
  location: "Ort"
  language: "Sprache"
  country: "Land"
</i18n>
