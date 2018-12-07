<template>
  <div>
    <!--{{> checkout/order-summary/header}}-->
    <div v-for="lineItem in cart.lineItems"
         :key="lineItem.id"
         class="row single-cart-item">
      <div class="col-sm-1 col-xs-4 product-img-col">
        <img :src="lineItem.variant.images[0].url"
             :alt="lineItem.name"
             class="img-responsive cart-item-img">
      </div>
      <div class="col-sm-3 col-xs-8 product-info-text">
        <p class="cart-item-name">
          <router-link :to="{ name: 'product',
            params: { productSlug: lineItem.productSlug, sku: lineItem.variant.sku }}">
            {{ lineItem.name }}
          </router-link>
        </p>
        <p class="grey-p">{{ lineItem.variant.sku }}</p>
        <!--<p class="cart-attributes">-->
          <!--{{#each attributes}}-->
          <!--{{name}}-->
          <!--<span class="black-p" data-model="cartItem.{{key}}">{{value}}</span>-->
          <!--{{#unless @last}}<br>{{/unless}}-->
          <!--{{/each}}-->
        <!--</p>-->
        <!--<p class="cart-item-availability grey-p">-->
          <!--<span class="glyphicon glyphicon-ok-sign"></span>{{i18n "catalog:availability.available"}}-->
        <!--</p>-->
      </div>


      <!--{{#if ../editable}}-->
      <!--<div class="col-sm-2 col-xs-12 cart-edit-delete">-->
        <!--<div class="edit-section-options">-->
          <!--<div class="edit-delete-section">-->
            <!--{{> checkout/remove-line-item-form this}}-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="col-sm-2 col-xs-12 clearfix">-->
        <!--{{> checkout/change-line-item-quantity-form this}}-->
      <!--</div>-->
      <!--{{else}}-->
      <!--<div class="col-sm-2 col-sm-offset-2 col-xs-12 text-center quantity-counter">-->
        <!--<span class="visible-xs">{{i18n "main:common.quantity"}}:</span>-->
        <!--<span class="quantity-number">{{quantity}}</span>-->
      <!--</div>-->
      <!--{{/if}}-->


      <div :class="editable ? 'col-xs-12 sm-pull-right' : 'col-xs-7'"
           class="col-sm-2">
        <div class="text-right cart-item-price">
          <!--<span class="visible-xs xs-price-title">{{i18n "main:common.price"}}</span>-->
          <span v-if="!hasDiscount(lineItem)"
                data-test="line-item-original-price">
              {{ formatPrice(originalPrice(lineItem)) }}
          </span>
          <span v-else>
            <span data-test="line-item-discounted-price"
                  class="discounted-price">
              {{ formatPrice(originalPrice(lineItem)) }}
            </span>
            <span data-test="line-item-discount-price">
              {{ formatPrice(discountedPrice(lineItem)) }}
            </span>
          </span>
        </div>
      </div>
      <div :class="editable ? 'col-xs-12 sm-pull-right' : 'col-xs-5'"
           class="col-sm-2">
        <div class="text-right cart-item-price">
          <!--<span class="visible-xs xs-price-title">{{i18n "checkout:total"}}</span>-->
          <span>{{ formatPrice(lineItem.totalPrice) }}</span>
        </div>
      </div>
    </div>
    <!--{{> checkout/order-summary/discount-code-input}}-->
    <!--{{> checkout/order-summary/discount-summary}}-->
    <!--{{#if checkoutConfirmation}}-->
    <!--{{> checkout/order-summary/confirmation-checkboxes}}-->
    <!--{{/if}}-->
    <div class="row">
      <div class="col-sm-12">
        <div class="total-price-calc">
          <!--{{// > checkout/order-summary/totals}}-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import priceMixin from '@/mixins/priceMixin';

export default {
  props: {
    cart: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: () => false,
    },
  },

  methods: {
    hasDiscount(lineItem) {
      return lineItem.price.discounted;
    },

    originalPrice(lineItem) {
      return lineItem.price.value;
    },

    discountedPrice(lineItem) {
      return lineItem.price.discounted.value;
    },
  },

  mixins: [priceMixin],
};
</script>

<i18n>
{
  "en": {
  },
  "de": {
  }
}
</i18n>
