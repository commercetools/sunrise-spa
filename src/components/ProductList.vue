<template>
  <div>
    <div v-if="loading">
      <img src="../assets/img/spinner.gif"/>
    </div>
    <div v-else-if="empty">
      {{ $t('catalog.searchNotFound.notFound') }}
    </div>
    <transition name="fade">
      <div v-if="!loading && !empty"
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
import ProductThumbnail from '@/components/ProductThumbnail.vue';
import categoryMixin from '@/mixins/categoryMixin';

export default {
  components: {
    ProductThumbnail,
  },

  props: ['categorySlug'],

  data: () => ({
    products: {},
  }),

  computed: {
    loading() {
      return this.$apollo.queries.products.loading;
    },

    empty() {
      return !(Array.isArray(this.products.results) && this.products.results.length > 0);
    },

    category() {
      return this.categoryBySlug(this.categorySlug);
    },

    gqlPredicate() {
      return this.category ? `masterData(current(categories(id="${this.category.id}")))` : null;
    },
  },

  mixins: [categoryMixin],

  apollo: {
    products: {
      query: gql`
      query listProducts($locale: Locale!, $currency: Currency!, $where: String) {
        products(limit: 20, where: $where, sort: "id asc") {
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
      skip() {
        return !this.gqlPredicate;
      },
    },
  },
};
</script>
