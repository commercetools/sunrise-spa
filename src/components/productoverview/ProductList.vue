<template>
  <div>
    <LoadingSpinner v-if="isLoading"/>

    <div v-else-if="categories && products">
      <form v-if="products.results.length"
            id="form-filter-products"
            name="filter-products" action="#">
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
          <div class="col-xs-4 hidden-xs text-left">
            <div class="custom-select-wrapper">
              <ProductSortSelector @changeSort="changeSort" />
              <!--{{> catalog/pop/sort-selector sortSelector=content.sortSelector}}-->
            </div>
          </div>
          <div class="custom-pagination"
               data-test="custom-pagination-top">
            <Pagination :products="products"
                        :offset="offset"
                        :limit="limit"
                        :totalProducts="totalProducts"
                        :page="page"
                        @pagechanged="changePage" />
          </div>
          <div class="col-xs-4 hidden-xs text-right">
            <!--{{> catalog/pop/display-selector displaySelector=content.displaySelector}}-->
          </div>
        </div>
        <div class="product-filter hidden-xs">
          <!--{{> catalog/pop/filters-sidebar}}-->
        </div>

        <div id="pop-product-list"
             class="row">
          <ProductThumbnail v-for="product in products.results"
                            data-test="product-list"
                            :key="product.id"
                            :product="product" />
        </div>
        <a href="#"
            id="scroll-to-top"
            class="scroll-to-top"
            v-scroll-to="{
              el: '#form-filter-products',
              duration: 500,
              easing: 'linear',
              offset: -200,
          }">
            <span class="scroll-to-top-text"> go to top </span>
          </a>
        <div class="custom-pagination">
          <Pagination :products="products"
                      :offset="offset"
                      :limit="limit"
                      :totalProducts="totalProducts"
                      :page="page"
                      @pagechanged="changePage" />
        </div>
      </form>
      <div v-else>
        <div class="empty-results-container">
            <span class="empty-results"
                  data-test="empty-results">
              {{ $t('catalog.noSearchResult.searchNotFound.notFound') }}
            </span>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="empty-results-container">
        <span class="empty-results"
              data-test="category-not-found">
          {{ $t('catalog.noSearchResult.searchNotFound.categoryNotFound') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import ProductThumbnail from '../common/ProductThumbnail.vue';
import ProductSortSelector from './ProductSortSelector.vue';
import Pagination from './Pagination.vue';

export default {
  props: ['categorySlug', 'page'],

  components: {
    LoadingSpinner,
    ProductThumbnail,
    ProductSortSelector,
    Pagination,
  },

  data: () => ({
    categories: null,
    products: null,
    sort: null,
    limit: 75,
  }),

  computed: {
    category() {
      return this.categories.results[0];
    },

    hasManyProducts() {
      return this.products?.results.length >= this.limit / 2;
    },

    offset() {
      return (this.page - 1) * this.limit;
    },

    totalProducts() {
      return this.products.total;
    },

    isLoading() {
      return this.$apollo.loading;
    },
  },

  methods: {
    changeSort(sort) {
      this.sort = sort;
    },

    changePage(page) {
      this.$router.push({ name: 'productsPagination', params: { page } });
    },

    scrollToTop() {
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
        query products($offset: Int!, $limit: Int!, $locale: Locale!, 
                       $currency: Currency!,
                       $where: String, $sort: [String!]) {
          products(offset: $offset, limit: $limit, where: $where, sort: $sort) {
            offset
            total
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
          currency: this.$store.state.currency,
          where: `masterData(current(categories(id="${this.category.id}")))`,
          sort: this.sort,
          offset: this.offset,
          limit: this.limit,
        };
      },
      skip: vm => !vm.categories || !vm.category,
    },
  },
};
</script>
