<template>
  <div class="pop-page">
    <div id="pop-page" class="container">
      <div class="pop-alert-overlay hidden">
        <div class="pop-alert-wrapper">
          <div class="pop-alert-box">
            <div class="pop-alert-text">
              {{ $t('main.messages.pleaseWait') }}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 figure-col">
          <!--{{> catalog/pop/banner banner=content.banner}}-->
        </div>
      </div>
      <div class="row row-offcanvas row-offcanvas-left">
        <div class="col-xs-12">
          <!--{{> catalog/breadcrumb breadcrumb=content.breadcrumb}}-->
        </div>
        <div class="col-sm-12">
          <div class="dark-overlay"></div>

          <!-- Mobile version -->
          <div class="row visible-xs">
            <div class="col-xs-12">
              <ul class="mobile-filter-list clearfix">
                <li class="pull-left">
                  <button type="button"
                          class="offcanvas-btn offcanvas-open"
                          data-toggle="modal"
                          data-target="#sidebar-overlay">
                    {{ $t('catalog.filters.open') }}
                  </button>
                </li>
              </ul>
            </div>
            <!--{{> catalog/pop/filters-sidebar-mobile}}-->
          </div>
          <!-- End mobile version -->

          <form id="form-filter-products" name="filter-products" action="#">
<!--            {{#if content.searchTerm}}
            <input type="hidden" name="q" value="{{content.searchTerm}}"/>
            {{/if}}-->

            <div class="row item-list-pagination">
<!--              {{#if content.searchResult}}
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

          <div id="pop-product-list" class="row">
            {{ categorySlug }}
            <!--{{#each products.list}}-->
            <!--<div class="col-xs-12 col-sm-6 col-md-4">-->
              <!--{{> catalog/product-thumbnail thumbnail=this index=@index}}-->
            <!--</div>-->
            <!--{{/each}}-->
          </div>
          <div class="row">
            <div class="col-sm-9 col-sm-offset-3 col-xs-12 text-center custom-pagination">
              <ul class="page-numbers page-numbers-bottom">
                <!--{{> common/pagination pagination=content.pagination}}-->
              </ul>
            </div>
          </div>
          <hr class="hr">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['categorySlug'],
};
</script>

<style scoped>

</style>
