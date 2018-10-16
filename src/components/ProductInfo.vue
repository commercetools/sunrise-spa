<template>
  <div>
    <div class="col-md-4 col-md-offset-1 col-sm-6">
      <!-- {{> catalog/pdp/product-gallery gallery=product.gallery}} -->
      <div class="bzoom_wrap hidden-xs">
        <!-- <img :src="displayedImage"/> -->
      </div>
    </div>
    <div class="col-sm-6 product-description">
      <div class="row">
        <div class="col-sm-12">
            <h1 class="text-uppercase pdp-product-title">
              {{currentProduct.name}}

            </h1>
            <span class="grey-p quickview-sku">
              <!-- {{product.variant.sku}} -->
            </span>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-rating }} -->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <p class="pdp-product-description view-details more"
            data-text-show="$t('description.show')"
            data-text-hide="$t('description.hide')">
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-price}} -->
        <!-- <div v-if="hasDiscount">
          <span
                class="strikethrough">
            {{ formatPrice(originalPrice) }}
          </span>
          <span data-test="product-thumbnail-discounted-price"
                class="pop-item-price-old">
            {{ formatPrice(discountedPrice) }}
          </span>
        </div> -->

          <p class="product-price">
            <span>
              <!-- {{ formatPrice(originalPrice) }} -->
            </span>
          </p>

        </div>
      </div>

      <!-- {{> catalog/add-to-cart}}
      {{> catalog/add-to-wishlist-btn}}
      {{> catalog/reserve-in-store-btn}} -->
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-availability availability=product.availability}} -->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="panel-group panel-group-pdp"
               id="accordion-product-info"
               role="tablist"
               aria-multiselectable="true">
            <!-- {{> catalog/pdp/product-details}}
            {{> catalog/pdp/delivery-rates}} -->
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/pdp/product-social}} -->
          <pre> {{currentProduct}} </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import priceMixin from '@/mixins/priceMixin';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    currentProduct() {
      return this.product.masterData ? this.product.masterData.current || {} : {};
    },
  },
  mixins: [priceMixin],
};
</script>

