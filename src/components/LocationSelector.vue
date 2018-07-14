<template>
  <li v-if="availableLangs"
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
                   v-model="language"
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
export default {
  data() {
    return {
      availableLangs: {
        en: 'English',
        de: 'Deutsch',
      },
    };
  },

  computed: {
    language() {
      return this.$i18n.locale;
    },

    languages() {
      return Object.entries(this.availableLangs).map(langEntry => ({ id: langEntry[0], name: langEntry[1] }));
    },
  },
};
</script>
