<style src="./ProductGallery.scss" lang="scss" scoped></style>
<script src="./ProductGallery.js"></script>

<template>
  <div v-if="product">
    <div class="easyzoom easyzoom--overlay" ref="easyzoom" style="width:450px">
      <a :href="productImage">
        <img :src="productImage" alt="" widh="450" style="width:450px" />
      </a>
    </div>
    <!-- <div class="pro-dec-zoom-img">
      <a class="img-popup" :href="productImage"><i class="fa fa-search-plus"></i></a>
    </div>-->
    <!-- <div class="product-dec-slider product-small-img-style mt-10">
    <div class="product-dec-small active">
      <img src="assets/images/product-details/small-1.jpg" alt="">
    </div>
    <div class="product-dec-small">
      <img src="assets/images/product-details/small-2.jpg" alt="">
    </div>
    <div class="product-dec-small">
      <img src="assets/images/product-details/small-3.jpg" alt="">
    </div>
    <div class="product-dec-small">
      <img src="assets/images/product-details/small-4.jpg" alt="">
    </div>
    <div class="product-dec-small">
      <img src="assets/images/product-details/small-2.jpg" alt="">
    </div>
    </div>-->
  </div>
</template>
