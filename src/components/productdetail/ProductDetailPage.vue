<template>
  <div>
    <div id="pdp-page">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 breadcrumb-col">
          <Breadcrumb />
          </div>
        </div>
        <div class="row product-info-row-pdp">
          <!-- {{> catalog/pdp/product-info product=content.product deliveryRates=content.deliveryRates}} -->
        <ProductInfo :productSlug="productSlug"
                     :sku="sku" />
        </div>
      </div>
    </div>
    <div class="pdp-page-review">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <p class="text-center text-uppercase may-like">
              {{ $t('suggestions.title') }}
            </p>
          </div>
        </div>
        <!-- <div class="row">
          {{#each content.suggestions.list}}
          <div class="col-xs-12 col-sm-6 col-md-3">
            {{> catalog/product-thumbnail thumbnail=this index=@index}}
          </div>
          {{/each}}
      </div> -->
        <hr class="hr">
        <!-- {{> catalog/pdp/reviews}} -->
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../common/Breadcrumb.vue';
import ProductInfo from './ProductInfo.vue';

export default {
  props: {
    productSlug: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },

  components: {
    Breadcrumb,
    ProductInfo,
  },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "suggestions": {
      "title": "You may also like"
    }
  },
  "de": {
    "suggestions": {
      "title": "Das könnte Ihnen auch gefallen"
    }
  }
}
</i18n>
