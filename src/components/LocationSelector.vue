<template>
  <li v-if="languages"
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
                   v-model="$i18n.locale"
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
  computed: {
    languages() {
      return Object.entries(this.$sunrise.languages)
        .map(langEntry => ({ id: langEntry[0], name: langEntry[1] }));
    },
  },
};
</script>
