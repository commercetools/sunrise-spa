<style src="./PageProductOverview.scss" lang="scss"></style>
<i18n src="./PageProductOverview.txt"></i18n>
<script src="./PageProductOverview.js"></script>

<template>
<div>
  <Breadcrumb :categorySlug="categorySlug" />
  <ProductList :categorySlug="categorySlug" :page="page" />
</div>

</template>
