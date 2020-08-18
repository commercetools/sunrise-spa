<style src="./PageProductOverview.scss" lang="scss"></style>
<i18n src="./PageProductOverview.txt"></i18n>
<script src="./PageProductOverview.js"></script>

<template>
  <div>
    <Breadcrumb :categorySlug="categorySlug" />
    <ProductList
      @openModal="openModal"
      :categorySlug="categorySlug"
      :page="page"
    />
    <ProductQuickView
      :showModal="showModal"
      :productSku="productSku"
      @closeModal="closeModal"
    />
  </div>
</template>
