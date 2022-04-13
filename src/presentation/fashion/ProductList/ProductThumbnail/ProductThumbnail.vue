<style src="./ProductThumbnail.scss" lang="scss"></style>
<i18n src="./ProductThumbnail.txt" lang="yaml"></i18n>
<script src="./ProductThumbnail.js"></script>

<template>
  <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
    <div class="product-wrap mb-50">
      <div class="product-img mb-25">
        <router-link
          :to="productRoute(product.slug, product.sku)"
        >
          <img
            class="default-img"
            :src="displayedImageUrl(product)"
            alt=""
          />
          <span
            data-test="product-thumbnail-sale-flag"
            v-if="hasDiscount"
            class="badge-pink badge-right"
            >{{
              (
                product.masterVariant.scopedPrice.discounted
                  .discount.name || ''
              ).toUpperCase()
            }}</span
          >
        </router-link>
        <div class="product-action">
          <!-- <a href @click.prevent="openAddToShoppingList"
            ><i class="dl-icon-heart"></i>
            <span>Shopping list</span></a
          >
          <a href @click.prevent="openQuickView"
            ><i class="dl-icon-view"></i>
            <span>Quick Shop</span></a
          > -->
          <!-- @todo: need translation -->
          <a
            data-toggle="tooltip"
            title="Add to Cart"
            href="#"
            @click.prevent="() => addToCart(product.sku)"
          >
            <i class="dl-icon-cart29"></i>
            <span>{{ t('addToCart') }}</span>
          </a>
        </div>
      </div>
      <div class="product-content text-center mt-15">
        <h3>
          <router-link
            :to="productRoute(product.slug, product.sku)"
            data-test="product-thumbnail-name"
            >{{ product.name }}
          </router-link>
        </h3>
        <div class="product-price" v-if="hasPrice">
          <BasePrice
            :price="product?.masterVariant?.scopedPrice"
          />
        </div>
      </div>
    </div>
  </div>
</template>
