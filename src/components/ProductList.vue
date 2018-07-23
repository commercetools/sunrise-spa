<template>
  <div id="pop-product-list" class="row">
    {{ categorySlug }}
    <div v-for="product in products.results"
        :key="product.id"
        class="col-xs-12 col-sm-6 col-md-4">
        <h1>{{product}}</h1>
        <!-- <ProductThumbnail :product="product" /> -->
    </div>
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

  data() {
    return {
      products: {},
    };
  },

  apollo: {
    products: {
      query: gql`
        query listProducts($locale: Locale!) {
          products(limit: 20) {
            total
            results {
              id
              masterData {
                current {
                  name(locale: $locale) 
                }
              }
            }
          }
        }`,
      variables() {
        return {
          locale: this.$i18n.locale,
        };
      },
    },
  },
};
</script>
