<template>
  <div v-if="product">
    <div data-test="product-gallery"
         class="col-md-4 col-md-offset-1 col-sm-6 product-gallery">
      <ProductGallery :sku="sku" />
    </div>
    <div data-test="product-data"
         class="col-sm-6 product-description">
      <div class="row">
        <div class="col-sm-12">
            <h1 data-test="product-name"
                class="text-uppercase pdp-product-title">
              {{ currentProduct.name }}
            </h1>
            <span data-test="product-sku"
                  class="grey-p quickview-sku">
              {{ matchingVariant.sku }}
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
             data-text-show="$t('showMore')"
             data-text-hide="$t('showLess')">
          </p>
        </div>
      </div>

      <div class="row">
        <div v-if="hasPrice"
             class="col-sm-12">
          <p class="product-price">
            <span v-if="!hasDiscount"
                  data-test="product-original-price">
              {{ formatPrice(originalPrice) }}
            </span>
            <span v-else>
              <span data-test="product-old-price"
                    class="discounted-price">
                {{ formatPrice(originalPrice) }}
              </span>
              <span data-test="product-new-price">
                {{ formatPrice(discountedPrice) }}
              </span>
            </span>
          </p>

        </div>
      </div>
      <!-- {{> catalog/add-to-cart}}
      {{> catalog/add-to-wishlist-btn}}
      {{> catalog/reserve-in-store-btn}} -->
      <AddToCartButton/>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-availability availability=product.availability}} -->
        </div>
      </div>
      <DetailsSection :sku="sku"/>
      <SocialMediaLinks/>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import priceMixin from '@/mixins/priceMixin';
import productMixin from '@/mixins/productMixin';
import ProductGallery from './ProductGallery.vue';
import SocialMediaLinks from './SocialMediaLinks.vue';
import DetailsSection from './DetailsSection.vue';
import AddToCartButton from './AddToCartButton.vue';

export default {
  components: {
    DetailsSection,
    ProductGallery,
    SocialMediaLinks,
    AddToCartButton,
  },

  props: {
    productSlug: String,
    sku: String,
  },

  data: () => ({
    product: null,
  }),

  computed: {
    matchingVariant() {
      return this.currentProduct.variant || {};
    },
  },

  mixins: [priceMixin, productMixin],

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
                variant(sku: $sku) {
                  sku
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
          currency: this.currency,
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
  "de": {
    "showMore": "Mehr",
    "showLess": "Weniger"
  },
  "en": {
    "showMore": "Show more",
    "showLess": "Show less"
  }
}
</i18n>
