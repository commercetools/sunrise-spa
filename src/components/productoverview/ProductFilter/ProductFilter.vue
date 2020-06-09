<style src="./ProductFilter.scss" lang="scss"></style>
<script src="./ProductFilter.js"></script>
<i18n src="./ProductFilter.txt"></i18n>

<template>
<SlideDown v-bind:show="show">
  <div class="product-filter-wrapper">
    <div class="row">
      <!-- Product Filter -->
      <div v-for="facet in facets" class="custom-col-width-23 mb-20">
        <div class="product-filter">
          <h5>{{facet.label}}</h5>
          <div class="filter-multiple" v-for="term in facet.terms">
            <ul>
              <li><label>
                  <input type="checkbox" :name="facet.name" :value="term.term"
                    :checked="isChecked(facet.name,term.term)" v-on:change="filterChange($event, facet.name)" />
                  {{term.term}} <span>({{term.productCount}})</span>
                </label></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</SlideDown>
</template>
