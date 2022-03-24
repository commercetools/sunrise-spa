<style src="./ProductGallery.scss" lang="scss" scoped></style>
<script src="./ProductGallery.js"></script>

<template>
  <div
    v-if="currentVariant"
    class="pro-dec-big-img-slider product-big-img-style"
  >
    <div class="easyzoom easyzoom--overlay" ref="easyzoom">
      <a :href="productImage">
        <img
          :class="
            !quickview ? 'product-image' : 'quickview-img'
          "
          :src="productImage"
          alt=""
          data-test="product-image"
        />
      </a>
    </div>
  </div>
</template>
