<style src="./TopBar.scss" lang="scss" scoped></style>
<i18n src="./TopBar.txt"></i18n>
<script src="./TopBar.js"></script>

<template>
<div class="shop-top-bar pb-15">
  <div class="shop-top-bar-left">
    <div class="shop-top-show">
      <span>Showing {{offset+1}}-{{offset+count}} of {{total}} results</span>
    </div>
  </div>
  <div class="shop-top-bar-right">
    <div class="shop-filter">
      <a class="shop-filter-active" href="#" v-on:click.prevent="toggleFilter"
        >Filters
        <i v-if="show" class="fa fa-angle-up"></i>
        <i v-else class="fa fa-angle-down"></i>
      </a>
    </div>
    <HoverDropdown data-test="sort-selector">
      <span
        >Sort by <i class="fa fa-angle-down angle-down"></i>
        <i class="fa fa-angle-up angle-up"></i
      ></span>
      <ul>
        <li v-for="item in sortItems" v-bind:key="item.id" v-bind:class="{active:sort===item.id}">
          <a href="#" @click.prevent="()=>changeSort(item.id)">{{item.name}}</a>
        </li>
      </ul>
    </HoverDropdown>
  </div>
</div>

</template>
