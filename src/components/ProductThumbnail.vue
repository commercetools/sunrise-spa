<template>
  <div class="col-xs-12 col-sm-6 col-md-4">
    <!-- <a id="link-product-thumbnail{{index}}" href="{{thumbnail.product.variant.url}}"> -->
    <div class="shop-item">
        <!-- <div v-if="thumbnail.sale" class="sale-flag">
          {{ $t('catalog.thumbnail.sale') }}
        </div> -->
        <!-- <div v-if="thumbnail.new" class="new-flag">
          {{ $t('catalog.thumbnail.new') }}
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
      <div class="pop-product-image">
        <img class="img-lazy"
             :src="product.masterData.current.masterVariant.images[0].url"
             :alt="product.masterData.current.name"/>
      </div>
      <div class="pop-product-name">
        <span class="name-headline">
          {{product.masterData.current.name}}
        </span>
        <!-- <span class="name-subline">{{thumbnail.product.variant.description}}</span> -->
      </div>
      <div class="pop-item-price">
        <!-- {{#if thumbnail.product.variant.priceOld}}
          <span class="strikethrough">{{thumbnail.product.variant.priceOld}}</span>
          <span class="pop-item-price-old">{{thumbnail.product.variant.price}}</span>
        {{else}}
        {{/if}} -->
          <span v-if="priceAmount">
            {{ $n(priceAmount, 'currency', $store.state.country) }}
          </span>
      </div>
      <div class="pop-product-more-colors">
        <!-- {{#if thumbnail.moreColors}}{{i18n "catalog:thumbnail.moreColors"}}{{/if}}&nbsp; -->
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
      <div class="shop-item-overlay hidden-xs">
        <!-- <button type="button" class="quickview" data-modal="quickview-modal{{index}}">
          {{ $t("catalog.thumbnail.quickView") }}
        </button> -->
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
import priceFormat from '@/mixins/priceFormat';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  mixins: [priceFormat],
};
</script>

<style>

</style>
