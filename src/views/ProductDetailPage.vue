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
        <div v-if="!loading && !empty"
             class="row product-info-row-pdp">
          <!-- {{> catalog/pdp/product-info product=content.product deliveryRates=content.deliveryRates}} -->
        <ProductInfo :product="product"
                     :key="product.id" />
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
import gql from 'graphql-tag';
import Breadcrumb from '@/components/Breadcrumb.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import priceMixin from '@/mixins/priceMixin';

export default {
  props: ['productSlug', 'sku'],

  components: {
    Breadcrumb,
    ProductInfo,
  },

  computed: {
    loading() {
      return this.$apollo.queries.product.loading;
    },

    empty() {
      return !this.product;
    },
  },

  mixins: [priceMixin],

  apollo: {
    product: {
      query: gql`
        query Product($locale: Locale!, $sku: String!, $currency: Currency!) {
          product(sku: $sku) {
            id
            masterData {
              current {
                name(locale: $locale)
                slug(locale: $locale)
                masterVariant {
                  sku
                  images {
                    url
                  }
                  price(currency: $currency) {
                    value {
                      ...printPrice
                    }
                    discounted {
                      value {
                        ...printPrice
                      }
                    }
                  }
                }
              }
            }
          }
        }
        fragment printPrice on BaseMoney {
          centAmount
          fractionDigits
        }`,
      variables() {
        return {
          locale: this.$i18n.locale,
          currency: 'EUR',
          sku: this.sku,
        };
      },
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
