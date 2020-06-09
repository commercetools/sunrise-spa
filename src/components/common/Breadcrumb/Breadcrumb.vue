<template>
  <div class="breadcrumb-area breadcrumb-bg-1 bg-gray mt-110">
    <div class="container-fluid"></div>
    <div class="breadcrumb-content text-center">
      <div class="breadcrumb-title">
        <h2>{{currentCategory.name}}</h2>
      </div>
      <ul>
        <li>
          <router-link to="/" data-test="breadcrumb-home-link">{{ $t('home') }}</router-link>
        </li>
        <li class="active" v-for="ancestor in currentCategory.ancestors" :key="ancestor.slug">
          <router-link
            :to="{ name: 'products', params: { categorySlug: ancestor.slug } }"
            class="active"
          >{{ancestor.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<i18n src="./i18n.txt"></i18n>
<style lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
