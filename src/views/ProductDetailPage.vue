<template>
  <div>
    <div class="darkbg hidden"></div>
    <!-- {{> common/header}} -->
    <div class="pdp-page">
      <div class="container">
        <!-- {{> common/messages}} -->
        <div class="row">
          <div class="col-xs-12 breadcrumb-col">
          <Breadcrumb />
          </div>
        </div>
        <div class="row product-info-row-pdp">
          <!-- {{> catalog/pdp/product-info product=content.product deliveryRates=content.deliveryRates}} -->
        <ProductInfo v-if="productInfo.id"
                     :product="productInfo"
                     :key="productInfo.id" />
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
import Breadcrumb from '@/components/Breadcrumb.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import { mapGetters } from 'vuex';

export default {
  props: ['productSlug', 'sku'],

  components: {
    Breadcrumb,
    ProductInfo,
  },

  computed: {
    ...mapGetters(['productInfo']),

    locale() {
      return this.$i18n.locale;
    },

    currency() {
      // return this.$i18n.numberFormats[this.$store.state.country].currency.currency;
      return 'EUR';
    },
  },

  methods: {
    fetchProduct() {
      this.$store.dispatch('fetchProduct', {
        locale: this.$i18n.locale,
        currency: this.currency,
        productSlug: this.productSlug,
        sku: this.sku,
      });
    },
  },

  created() {
    this.fetchProduct();
  },

  watch: {
    locale() {
      this.fetchProduct();
    },
    currency() {
      this.fetchProduct();
    },
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
