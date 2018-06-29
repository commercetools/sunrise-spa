<template>
  <li v-if="active"
      class="list-item-location clearfix">
    <button data-test="location-selector-open-button"
            id="location-dropdown-toggle-btn"
            class="location-dropdown-toggle">
      <img class="pull-right"
           src="../assets/img/globe-2.png"
           :alt="$t('main.header.location')">
    </button>
    <div class="location-dropdown">
      <!--{{#if location.language}}-->
      <span class="location-dropdown-label">
        {{ $t("main.header.language") }}
      </span>
      <SelectBoxIt :options="languages"
                   v-model="selectedLang"
                   id="language"
                   data-test="location-selector"
                   class="select location-select"/>
      <!--{{/if}}-->
      <!--{{#if location.country}}-->
      <!--<form id="form-select-country" action="{{@root.meta._links.selectCountry.href}}" method="POST">-->
        <!--<input type="hidden" name="csrfToken" value="{{@root.meta.csrfToken}}"/>-->
        <!--<span class="location-dropdown-label">{{i18n "main:header.country"}}</span>-->
        <!--<select name="country" id="country-select" class="select location-select">-->
          <!--{{#each location.country}}-->
          <!--<option value="{{value}}" {{#if selected}}selected{{/if}}>{{label}}</option>-->
          <!--{{/each}}-->
        <!--</select>-->
      <!--{{/if}}-->
    </div>
  </li>
</template>

<script>
import { setLanguage } from '@/setup/i18n-setup';

export default {
  data() {
    return {
      selectedLang: this.$i18n.locale,
    };
  },

  computed: {
    active() {
      return this.$config.locales.length > 1;
    },

    languages() {
      return this.$config.locales.map(locale => ({ id: locale.code, name: locale.name }));
    },
  },

  watch: {
    selectedLang(selectedLang) {
      setLanguage(selectedLang);
    },
  },
};
</script>
