<template>
  <div class="breadcrumb-area breadcrumb-bg-1 bg-gray mt-110">
    <div class="container-fluid"></div>
    <div class="breadcrumb-content text-center">
      <div v-if="currentCategory && currentCategory.name" class="breadcrumb-title">
        <h2>{{currentCategory.name}}</h2>
      </div>
      <ul v-if="currentCategory && currentCategory.ancestors">
        <li>
          <router-link to="/" data-test="breadcrumb-home-link">{{ $t('home') }}</router-link>
        </li>
        <li class="active" v-for="ancestor in currentCategory.ancestors" :key="ancestor.slug">
          <router-link
            data-test=breadcrumb-ancestor-link
            v-if="ancestor.name"
            :to="{ name: 'products', params: { categorySlug: ancestor.slug } }"
            class="active"
          >{{ancestor.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<i18n src="./Breadcrumb.txt"></i18n>
<style lang="scss" src="./Breadcrumb.scss"></style>
<script src="./Breadcrumb.js"></script>
