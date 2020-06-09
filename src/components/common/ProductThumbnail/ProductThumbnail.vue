<style src="./ProductThumbnail.scss" lang="scss"></style>
<i18n src="./ProductThumbnail.txt"></i18n>
<script src="./ProductThumbnail.js"></script>

<template>
<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
  <div class="product-wrap mb-50">
    <div class="product-img mb-25">
      <router-link :to="productRoute(currentProduct.slug, matchingVariant.sku)">
        <img class="default-img" :src="displayedImageUrl(matchingVariant)" alt="">
        <img class="hover-img" :src="displayedImageUrl(matchingVariant)" alt="">
        <span data-test="product-thumbnail-sale-flag" v-if="hasPrice && hasDiscount"
          class="badge-pink badge-right">Sale</span>
      </router-link>
      <div class="product-action">
        <a data-toggle="modal" data-target="#exampleModal" href="#"><i class="dl-icon-view"></i>
          <span>Quick Shop</span></a>
        <a data-toggle="tooltip" title="Add to Cart" href="#"><i class=" dl-icon-cart29"></i></a>
        <a data-toggle="tooltip" title="Add to Wishlist" href="#"><i class="dl-icon-heart4"></i></a>
        <a data-toggle="tooltip" title="Add to Compare" href="#"><i class="dl-icon-compare"></i></a>
      </div>
    </div>
    <div class="product-content text-center">
      <h3>
        <router-link
          :to="productRoute(currentProduct.slug, matchingVariant.sku)"
          data-test="product-thumbnail-name"
        >{{ currentProduct.name }}
        </router-link>
      </h3>
      <div class="product-price" v-if="hasPrice">
        <BasePrice :price="matchingVariant.price" />
      </div>
    </div>
  </div>
</div>
</template>
