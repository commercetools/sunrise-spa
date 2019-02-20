<template>
  <div>
    <div v-if="isLoading">
      <img data-test="spinner" src="../../assets/img/spinner.gif"/>
    </div>
    <div v-else-if="products && !products.results.length">
      {{ $t('catalog.searchNotFound.notFound') }}
    </div>
    <transition name="fade">
      <div v-if="!isLoading && products && products.results.length"
           id="pop-product-list"
           class="row">
        <ProductThumbnail v-for="product in products.results"
                          data-test="product-list"
                          :key="product.id"
                          :product="product" />
      </div>
    </transition>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ProductThumbnail from '../common/ProductThumbnail.vue';

export default {
  components: {
    ProductThumbnail,
  },

  props: ['categorySlug', 'sort'],

  data: () => ({
    categories: null,
    products: null,
  }),

  computed: {
    category: vm => vm.categories.results[0],

    isLoading() {
      return this.$apollo.loading;
    },

    passSorting() {
      if (this.sort === 'newest') {
        return 'createdAt desc';
      } if (this.sort === 'oldest') {
        return 'createdAt asc';
      } return null;
    },
  },

  apollo: {
    categories: {
      query: gql`
        query categories($where: String) {
          categories(where: $where, limit: 1) {
            results {
              id
            }
          }
        }`,
      variables() {
        return {
          where: `slug(${this.$i18n.locale}="${this.categorySlug}")`,
        };
      },
      skip: vm => !vm.categorySlug,
    },

    products: {
      query: gql`
        query products($locale: Locale!, $currency: Currency!, $where: String, $sort: [String!]) {
          products(limit: 20, where: $where, sort: $sort) {
            results {
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
                      discounted {
                        value {
                          ...ProductListPriceInfo
                        }
                      }
                      value {
                        ...ProductListPriceInfo
                      }
                    }
                  }
                }
              }
            }
          }
        }

        fragment ProductListPriceInfo on BaseMoney {
          centAmount
          fractionDigits
        }`,
      variables() {
        return {
          locale: this.$i18n.locale,
          currency: this.$i18n.numberFormats[this.$store.state.country].currency.currency,
          where: `masterData(current(categories(id="${this.category.id}")))`,
          sort: this.passSorting,
        };
      },
      skip: vm => !vm.categories,
      fetchPolicy: 'network-only',
    },
  },
};
</script>
