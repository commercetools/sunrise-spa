<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <!-- <BaseForm v-if="!isLoading"
            :vuelidate="$v"
            :onSubmit="addLineItem"
            #default="{ error, state }">
    <ServerError :error="error"/>
    <div class="row select-row">
      <ul class="list-inline">
        <!--{{#each product.attributes}}
        <!--{{> catalog/product-attribute attribute=this
                variants=../product.variants identifiers=../product.variantIdentifiers}}
        <!--{{/each}}
        <!--<li class="size-guide-li">
        <!--{{> catalog/size-guide}}
        <!--</li>
      </ul>
    </div>
    <div class="row">
      <ul class="product-actions-list list-inline">
        <li class="bag-items-li">
          <BaseSelect v-model.number="form.quantity"
                      :vuelidate="$v.form.quantity"
                      :options="quantities"
                      data-test="add-to-cart-form-quantity-dropdown"
                      class="bag-items"/>
        </li>
        <li>
          <LoadingButton :state="state"
                         data-test="add-to-cart-form-button"
                         class="add-to-bag-btn">
            <img class="bag-thumb"
                 src="../../../assets/img/hand-bag-2-black.png"
                 alt="$t('addToCart')">
            {{ $t('addToCart') }}
          </LoadingButton>
        </li>
      </ul>
    </div>
  </BaseForm> -->
  <div class="product-dec-action-wrap pro-dec-action-2">
    <div class="quality-cart-wrap">
      <div class="quality-wrap">
        <input
          class="input-text qty"
          type="number"
          name="qty"
          maxlength="12"
          v-model="quantity"
          title="Qty">
      </div>
      <div class="pro-cart-wrap">
        <a href="#" @click.prevent="addLineItem">{{$t('addToCart')}}</a>
      </div>
    </div>
    <!-- <div class="pro-dec-wishlist-compare">
      <a title="Add to wishlist" href="#"><i class="dl-icon-heart2"></i></a>
      <a title="Add to compare" href="#"><i class="dl-icon-compare2"></i></a>
    </div> -->
  </div>

</template>
