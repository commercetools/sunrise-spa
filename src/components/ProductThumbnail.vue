<template>
  <div class="col-xs-12 col-sm-6 col-md-4">
    <!-- <a id="link-product-thumbnail{{index}}" href="{{thumbnail.product.variant.url}}"> -->
    <div data-test="product-thumbnail"
         class="shop-item">
        <div v-if="hasPrice && hasDiscount"
             class="sale-flag"
             data-test="product-thumbnail-sale-flag">
          {{ $t('sale') }}
        </div>
        <!-- <div v-if="thumbnail.new" class="new-flag">
          {{ $t('new') }}
        </div> -->
      <!-- <form id="form-add-to-wishlist-mobile{{index}}"
            method="post"
            {{#if wishlist}}class="hidden"{{/if}}
            name="add-to-wishlist-mobile"
            action="{{@root.meta._links.addToWishlist.href}}">

          <input type="hidden" name="csrfToken" value="{{@root.meta.csrfToken}}"/>
          <input type="hidden" name="productId" value="{{product.productId}}">
          <input type="hidden" name="variantId" value="{{product.variantId}}">

          <button type="submit" class="heart-xs visible-xs">
          <span class="sr-only">{{ $t("catalog.wishlist.add") }}</span>
        </button>
      </form> -->
      <div v-if="hasImages"
           class="pop-product-image">
        <img class="img-lazy"
             :src="displayedImage"
             :alt="currentProduct.name"/>
      </div>
      <div class="pop-product-name">
        <span data-test="product-thumbnail-name"
              class="name-headline">
          {{ currentProduct.name }}
        </span>
      </div>
      <div v-if="hasPrice"
           class="pop-item-price">
        <div v-if="hasDiscount">
          <span data-test="product-thumbnail-price"
                class="strikethrough">
            {{ formatPrice(originalPrice) }}
          </span>
          <span data-test="product-thumbnail-discounted-price"
                class="pop-item-price-old">
            {{ formatPrice(discountedPrice) }}
          </span>

        </div>
        <span v-else
              data-test="product-thumbnail-price">
          {{ formatPrice(originalPrice) }}
        </span>
      </div>

      <div class="pop-product-more-colors">
        <div v-if="hasMoreColors">
          {{ $t('moreColors')}} &nbsp;
          <ul class="list-inline">
            <li>
              <div class="product-thumbnail-swatch-red"></div>
            </li>
            <li>
              <div class="product-thumbnail-swatch-green"></div>
            </li>
            <li>
              <div class="product-thumbnail-swatch-blue"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="shop-item-overlay hidden-xs">
        <button type="button"
                class="quickview"
                data-modal="quickview-modal">
          {{ $t("quickView") }}
        </button>
         <!-- <form id="form-add-to-wishlist{{index}}"
                    method="post"
                    {{#if wishlist}}class="hidden"{{/if}}
                    name="add-to-wishlist"
                    action="{{@root.meta._links.addToWishlist.href}}">
            <input type="hidden" name="csrfToken" value="{{@root.meta.csrfToken}}"/>
            <input type="hidden" name="productId" value="{{product.productId}}">
            <input type="hidden" name="variantId" value="{{product.variantId}}">

            <button type="submit" class="heart">
            <span class="sr-only">{{i18n "catalog:wishlist.add"}}</span>
          </button>
        </form> -->
      </div>
    </div>
  <!-- </a> -->
  <!-- {{> catalog/quickview wishlist=wishlist}} -->
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
      return this.product.masterData.current || {};
    },

    matchingVariant() {
      // with query endpoint we cannot really determine
      return this.currentProduct.masterVariant || {};
    },

    hasMoreColors() {
      // with sunrise data it is not possible to determine
      return false;
    },

    hasImages() {
      return Array.isArray(this.matchingVariant.images) && this.matchingVariant.images.length > 0;
    },

    hasPrice() {
      return this.matchingVariant.price;
    },

    hasDiscount() {
      return this.matchingVariant.price.discounted;
    },

    displayedImage() {
      return this.matchingVariant.images[0].url;
    },

    discountedPrice() {
      return this.matchingVariant.price.discounted.value;
    },

    originalPrice() {
      return this.matchingVariant.price.value;
    },
  },

  mixins: [priceMixin],
};
</script>


<i18n>
  {
   "en": {
      "sale": "Sale",
      "new": "New",
      "quickView": "Quick view",
      "moreColors": "More colours"
   },
   "de": {
      "sale": "Sale",
      "new": "Neu",
      "quickView": "Schnellansicht",
      "moreColors": "Mehr Farben"
   }
  }
</i18n>
