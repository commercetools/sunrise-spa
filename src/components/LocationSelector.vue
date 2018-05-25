<template>
  <li class="list-item-location clearfix">
    <button id="location-dropdown-toggle-btn" class="location-dropdown-toggle">
      <img class="pull-right" src="../assets/img/globe-2.png" :alt="$t('main.header.location')">
    </button>
    <div class="location-dropdown">
      <!--{{#if location.language}}-->
      <span class="location-dropdown-label">
        {{ $t("main.header.language") }}
        <input type="text" v-model="selected">
      </span>
      <SelectBoxIt :options="languages" v-model="selected"></SelectBoxIt>
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
import SelectBoxIt from '@/components/SelectBoxIt.vue';

export default {
  name: 'LocationSelector',

  data() {
    return {
      languages: Object.keys(this.$i18n.messages).map(locale => ({ id: locale, name: locale.toUpperCase() })),
      selected: this.$i18n.locale,
    };
  },

  watch: {
    selected(selected) {
      console.log('Changing language!');
      this.$i18n.locale = selected;
    },
  },

  components: {
    SelectBoxIt,
  },
};
</script>

<style scoped>

</style>
