<style src="./LineItemInfo.scss" lang="scss" scoped></style>
<script src="./LineItemInfo.js"></script>
<i18n src="./LineItemInfo.txt"></i18n>

<template>
<span>
  <div class="cart-img">
    <router-link :to="productRoute(lineItem.productSlug, lineItem.variant.sku)" class="img">
      <img :src="displayedImageUrl(lineItem.variant)" :alt="lineItem.name">
    </router-link>
  </div>
  <div class="cart-title">
    <h4>
      <router-link :to="productRoute(lineItem.productSlug, lineItem.variant.sku)" data-test="cart-line-item-link">
        {{ lineItem.name }}
      </router-link>
    </h4>
    <span>{{ lineItem.quantity }} ×
      <BaseMoney :money="lineItem.totalPrice" /></span>
  </div>
  <div class="cart-delete">
    <a href="#">×</a>
  </div>
</span>
</template>
