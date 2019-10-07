<template>
  <div>
    <form id="form-filter-products" name="filter-products" action="#">
<!--  {{#if content.searchTerm}}
        <input type="hidden" name="q" value="{{content.searchTerm}}"/>
      {{/if}}-->

      <div class="row item-list-pagination">
<!--    {{#if content.searchResult}}
        <div class="search-results-row">
          {{> catalog/pop/search-result searchResult=content.searchResult}}
        </div>
        {{else}}
        <div class="jumbotron-row">
          {{> catalog/pop/jumbotron jumbotron=content.jumbotron}}
        </div>
        {{/if}}-->
        <div v-if="products && products.results.length"
             class="col-xs-4 hidden-xs text-left">
          <div class="custom-select-wrapper">
            <ProductSortSelector @changeSort="changeSort" />
            <!--{{> catalog/pop/sort-selector sortSelector=content.sortSelector}}-->
          </div>
        </div>
        <div class="col-xs-4 hidden-xs text-center custom-pagination">
          <ul class="page-numbers">
            <!--{{> common/pagination pagination=content.pagination}}-->
          </ul>
        </div>
        <div class="col-xs-4 hidden-xs text-right">
          <!--{{> catalog/pop/display-selector displaySelector=content.displaySelector}}-->
        </div>
      </div>
      <div class="product-filter hidden-xs">
        <!--{{> catalog/pop/filters-sidebar}}-->
      </div>
    </form>
    <div v-if="isLoading">
      <img data-test="spinner" src="../../assets/img/spinner.gif"/>
    </div>
    <div v-else-if="products && !products.results.length"
         class="empty-results">
      <span class="no-results-found">
        {{ $t('catalog.noSearchResult.searchNotFound.notFound') }}
      </span>
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
import ProductSortSelector from './ProductSortSelector.vue';

export default {
  components: {
    ProductThumbnail,
    ProductSortSelector,
  },

  props: ['categorySlug'],

  data: () => ({
    categories: null,
    products: null,
    sort: null,
  }),

  computed: {
    category: vm => vm.categories.results[0],

    isLoading() {
      return this.$apollo.loading;
    },
  },

  methods: {
    changeSort(sort) {
      this.sort = sort;
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
          where: `slug(${this.$store.state.locale}="${this.categorySlug}")`,
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
          locale: this.$store.state.locale,
          currency: this.$i18n.numberFormats[this.$store.state.country].currency.currency,
          where: `masterData(current(categories(id="${this.category.id}")))`,
          sort: this.sort,
        };
      },
      skip: vm => !vm.categories,
    },
  },
};
</script>
