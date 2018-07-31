<template>
  <div id="pop-product-list"
       class="row">
    <ProductThumbnail v-for="product in products.results"
                      :key="product.id"
                      :product="product" />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ProductThumbnail from '@/components/ProductThumbnail.vue';
import categoryData from '@/mixins/categoryData';

export default {
  components: {
    ProductThumbnail,
  },

  props: ['categorySlug'],

  data: () => ({
    products: {},
  }),

  computed: {
    category() {
      return this.categoryBySlug(this.categorySlug);
    },

    gqlPredicate() {
      return this.category ? `masterData(current(categories(id="${this.category.id}")))` : null;
    },
  },

  mixins: [categoryData],

  apollo: {
    products: {
      query: gql`
      query listProducts($locale: Locale!, $currency: Currency!, $where: String) {
        products(limit: 20, where: $where, sort: "id asc") {
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
                    discounted {
                      value {
                        ...printPrice
                      }
                    } 
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
          currency: this.$i18n.numberFormats[this.$store.state.country].currency.currency,
          where: this.gqlPredicate,
        };
      },
    },
  },
};
</script>
