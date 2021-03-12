<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div class="product-dec-action-wrap pro-dec-action-2">
    <form 
      v-if="isOnStock"
      ref="form"
      v-on:submit.prevent="addLineItem"
    >
      <div class="quality-cart-wrap" >
        <div class="quality-wrap">
          <input
            class="input-text qty"
            type="number"
            min="1"
            :max="availableQuantity"
            name="qty"
            maxlength="12"
            v-model="quantity"
            data-test="add-to-cart-amount"
            title="Qty">
        </div>
        <div class="quality-wrap">
          <!-- <a
            href="#" 
            @click.prevent="submitForm"
            data-test="add-to-cart-button"
          >
            {{$t('addToCart')}}
          </a> -->
          <input type="submit" :value="$t('addToCart')">
        </div>
      </div>
    </form>
    <div v-else>
      <div class="pro-cart-wrap">
        {{$t('notInStock')}}
      </div>
    </div>

  </div>

</template>
