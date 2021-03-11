<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div class="product-dec-action-wrap pro-dec-action-2">
    <div class="quality-cart-wrap" v-if="isOnStock">
      <div class="quality-wrap">
        <input
          class="input-text qty"
          type="number"
          name="qty"
          maxlength="12"
          v-model="quantity"
          data-test="add-to-cart-amount"
          title="Qty">
      </div>
      <div class="pro-cart-wrap">
        <a
          href="#" @click.prevent="addLineItem"
          data-test="add-to-cart-button"
        >
          {{$t('addToCart')}}
        </a>
      </div>
    </div>
    <div v-else>
      <div class="pro-cart-wrap">
        {{$t('notInStock')}}
      </div>
    </div>

  </div>

</template>
