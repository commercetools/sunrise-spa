<template>
  <div>
    <LoadingSpinner v-if="isLoading"/>

    <div v-else-if="products">
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
          }"
          v-vpshow="showScroll"
        >
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
/* eslint-disable no-param-reassign */
import gql from 'graphql-tag';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import ProductThumbnail from '../common/ProductThumbnail.vue';
import ProductSortSelector from './ProductSortSelector.vue';
import Pagination from './Pagination.vue';
import { products } from '../../api';

const toPrice = (prices, country, currency) => ({
  ...prices.filter(
    p => !p.customerGroup
        && !p.channel
        && p.country === country
        && p.value.currencyCode === currency,
  )[0],
});

const getProducts = (component) => {
  const category = component.categories?.results[0]?.id;
  component.loadingProducts = true;
  const route = component.$route;
  const {
    locale,
    currency,
    country,
  } = component.$store.state;
  const sortValue = route.query.sort;
  const searchText = route.query.q
    ? { [`text.${locale}`]: route.query.q }
    : {};
  const sort = sortValue
    ? { sort: `createdAt ${sortValue === 'newest' ? 'desc' : 'asc'}` }
    : {};
  products.get({
    category,
    page: Number(route.params?.page || 1),
    pageSize: component.limit,
    ...sort,
    ...searchText,
  }).then(({ results, ...meta }) => {
    component.products = {
      ...meta,
      results: results.map(
        ({
          id, masterVariant: { sku, images, prices }, name, slug,
        }) => ({
          id,
          masterData: {
            current: {
              name: name[locale],
              slug: slug[locale],
              masterVariant: {
                sku,
                images,
                price: toPrice(prices, country, currency),
              },
            },
          },
        }),
      ),
    };
    component.loadingProducts = false;
  });
};
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
    loadingProducts: false,
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
      return this.loadingProducts || this.$apollo.loading;
    },
  },

  methods: {
    changeSort(sort) {
      this.sort = sort;
    },

    changePage(page) {
      const { params, query } = this.$route;
      this.$router.push({
        name: 'products',
        params: { ...params, page },
        query,
      });
    },

    showScroll(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.display = window.innerHeight > 300
       && window.scrollY > 200 ? '' : 'none';
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

  },

  watch: {
    $route() {
      getProducts(this);
    },
    categories() {
      getProducts(this);
    },
  },
};
</script>
