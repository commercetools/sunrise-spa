<style src="./ProductFilter.scss" lang="scss"></style>
<script src="./ProductFilter.js"></script>
<i18n src="./ProductFilter.txt"></i18n>

<template>
<SlideDown v-bind:show="show">
  <div class="product-filter-wrapper" style="display:block">
    <div class="row">
      <!-- Product Filter -->
      <div v-for="facet in facets" v-bind:key="facet.label" class="custom-col-width-23 mb-20">
        <TermFilter
          :name="facet.name"
          :label="facet.label"
          :component="facet.component"
          :terms="getTerms(facet)"
          v-on:changed="filterChange"
        />
      </div>
    </div>
  </div>
</SlideDown>
</template>
