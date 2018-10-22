<template>
  <div>
    <div class="col-md-4 col-md-offset-1 col-sm-6">
      <!-- {{> catalog/pdp/product-gallery gallery=product.gallery}} -->
      <ProductGallery :displayedImage="displayedImage" />
    </div>
    <div class="col-sm-6 product-description">
      <div class="row">
        <div class="col-sm-12">
            <h1 class="text-uppercase pdp-product-title">
              {{currentProduct.name}}
            </h1>
            <span class="grey-p quickview-sku">
              {{currentProduct.masterVariant.sku}}
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
          <span class="strikethrough">
            {{ formatPrice(originalPrice) }}
          </span>
          <span data-test="product-thumbnail-discounted-price"
                class="pop-item-price-old">
            {{ formatPrice(discountedPrice) }}
          </span>
        </div> -->

          <p class="product-price">
            <!-- <span>
              {{ formatPrice(originalPrice) }}
            </span> -->
          </p>

        </div>
      </div>

      <!-- {{> catalog/add-to-cart}}
      {{> catalog/add-to-wishlist-btn}}
      {{> catalog/reserve-in-store-btn}} -->
      <button id="" class="add-to-bag-btn">
        <img class="bag-thumb"
             src="../assets/img/hand-bag-2-black.png"
             alt="$t('catalog.cart.add')">
        {{ $t('catalog.cart.add') }}
      </button>
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
            <ProductDetails />
            <DeliveryRates />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ProductSocial />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import priceMixin from '@/mixins/priceMixin';
import ProductDetails from '@/components/ProductDetails.vue';
import DeliveryRates from '@/components/DeliveryRates.vue';
import ProductSocial from '@/components/ProductSocial.vue';
import ProductGallery from '@/components/ProductGallery.vue';

export default {
  components: {
    ProductDetails,
    DeliveryRates,
    ProductSocial,
    ProductGallery,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    currentProduct() {
      return this.product.masterData.current;
    },

    hasPrice() {
      return this.matchingVariant.price;
    },

    originalPrice() {
      return this.currentProduct.masterVariant.price.value;
    },

    displayedImage() {
      console.log('CHILD', this.currency());
      return this.currentProduct.masterVariant.images[0].url;
    },
  },
  mixins: [priceMixin],
};
</script>

