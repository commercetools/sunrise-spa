<style src="./PageProductOverview.scss" lang="scss"></style>
<i18n src="./PageProductOverview.txt"></i18n>
<script src="./PageProductOverview.js"></script>

<template>
  <div>
    <Breadcrumb :categorySlug="categorySlug" />
    <ProductList
      @showModal="showModal"
      :categorySlug="categorySlug"
      :page="page"
    />
    <ProductQuickView
      :openModal="openModal"
      :productSlug="productSlug"
      :productSku="productSku"
    />
  </div>
</template>
