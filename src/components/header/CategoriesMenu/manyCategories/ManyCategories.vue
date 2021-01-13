<i18n src="./ManyCategories.txt"></i18n>
<script src="./ManyCategories.js"></script>

<template>
<nav>
  <ul v-if="sortedCategories && sortedCategories.length">
    <li
      class="position-static"
      v-for="category in sortedCategories"
      :key="category.id"
      data-test="category-1st-level"
    >
      <router-link
        :to="{ name: 'products', params: { categorySlug: category.slug } }"
        :class="isActive(category.name) ? 'active' : ''"
        data-test="category-1st-level-link"
      >
        {{ category.name.toUpperCase() }}
      </router-link>
    </li>
  </ul>
</nav>

</template>
