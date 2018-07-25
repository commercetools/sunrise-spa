<template>
  <div id="pop-product-list" class="row">
    {{ categorySlug }}
    <ProductThumbnail v-for="product in products.results"
                      :key="product.id"
                      :product="product" />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ProductThumbnail from '@/components/ProductThumbnail.vue';

export default {
  components: {
    ProductThumbnail,
  },

  props: ['categorySlug'],

  data: () => ({
    products: {},
  }),

  apollo: {
    products: {
      query: gql`
      query listProducts($locale: Locale!, $currency: Currency!) {
        products(limit: 20) {
          total
          results {
            id
            masterData {
              current {
                name(locale: $locale) 
                masterVariant {
                  images {
                    url
                  }
                  price(currency: $currency) {
                    value {
                      centAmount,
                      currencyCode
                    }
                  } 
                }
              }
            }
          }
        }
      }`,
      variables() {
        return {
          locale: this.$i18n.locale,
          currency: this.$store.state.currency,
        };
      },
    },
  },
};
</script>
