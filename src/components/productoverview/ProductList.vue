<template>
  <div>
    <div v-if="!products">
      <img src="../../assets/img/spinner.gif"/>
    </div>
    <div v-else-if="!products.results.length">
      {{ $t('catalog.searchNotFound.notFound') }}
    </div>
    <transition name="fade">
      <div v-if="products && products.results.length"
           id="pop-product-list"
           class="row">
        <ProductThumbnail v-for="product in products.results"
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

  props: ['categorySlug'],

  data: () => ({
    categories: null,
    products: null,
  }),

  computed: {
    category: vm => vm.categories.results[0],
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
        query products($locale: Locale!, $currency: Currency!, $where: String) {
          products(limit: 20, where: $where, sort: "id asc") {
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
        };
      },
      skip: vm => !vm.categories,
    },
  },
};
</script>
