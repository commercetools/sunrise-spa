<template>
  <div>
    <div class="col-md-4 col-md-offset-1 col-sm-6">
      <!-- {{> catalog/pdp/product-gallery gallery=product.gallery}} -->
      <div  v-if="hasImages"
            class="bzoom_wrap hidden-xs">
        <img :src="displayedImage"
             :alt="currentProduct.name"/>
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
              {{currentProduct.skus[0]}}
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
        <div v-if="hasPrice"
             class="col-sm-12">
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
              {{ formatPrice(originalPrice) }}
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
import { mapGetters } from 'vuex';
import priceMixin from '@/mixins/priceMixin';

export default {
  computed: {
    ...mapGetters(['productInfo']),

    currentProduct() {
      return this.productInfo.masterData ? this.productInfo.masterData.current || {} : {};
    },

    matchingVariant() {
      return this.currentProduct.masterVariant || {};
    },

    hasPrice() {
      return this.matchingVariant.price;
    },

    originalPrice() {
      return this.matchingVariant.price.value;
    },

    hasImages() {
      return Array.isArray(this.matchingVariant.images) && this.matchingVariant.images.length > 0;
    },

    displayedImage() {
      return this.matchingVariant.images[0].url;
    },

    locale() {
      return this.$i18n.locale;
    },
    // hasDiscount: vm => vm.matchingVariant.price.discounted,

    // discountedPrice: vm => vm.matchingVariant.price.discounted.value,
  },

  created() {
    this.fetchProduct();
  },

  methods: {
    fetchProduct() {
      this.$store.dispatch('fetchProduct', this.$i18n.locale);
    },
  },

  watch: {
    locale() {
      this.fetchProduct();
    },
  },


  mixins: [priceMixin],
};
</script>

