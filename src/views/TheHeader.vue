<template>
  <div class="navbar navbar-fixed-top">

    <div class="header">
      <header class="container">
        <div class="row">
          <div class="col-xs-12">
            <ul class="nav-list">

              <!-- Toggle the menu on mobile -->
              <li class="list-item-nav-toggle">
                <button type="button"
                        class="navbar-toggle"
                        data-toggle="collapse"
                        data-target=".navbar-collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </li>
              <!-- End -->

              <!-- Toggles the search field on mobile / not visible on desktop -->
              <li class="list-item-search">
                <button type="button"
                        class="search-toggle icon-magnifying-glass">
                  <span class="sr-only">{{ $t("search") }}</span>
                </button>
              </li>
              <!-- End -->

              <li data-test="stores-link"
                  class="list-item-store">
                <router-link :to="{ name: 'stores' }"
                             class="store-select icon-marker">
                  <span class="hidden-xs">{{ $t("stores") }}</span>
                </router-link>
              </li>

              <li class="list-item-help">
                <a href="#"
                   class="link-help">
                  {{ $t("help") }}
                </a>
              </li>

              <li class="list-item-call">
                <a href="tel:0044123456000"
                   class="link-hotline">
                  {{ $t("callUs") }}
                </a>
              </li>

              <li class="list-item-bag">
                <!--{{> common/mini-cart miniCart=header.miniCart}}-->
              </li>

              <LoginBoxHeader/>

              <LocationSelector/>
            </ul>
          </div>
        </div>
      </header>
    </div>

    <div id="navigation" class="container">
      <div class="row logo-search">
        <div class="col-sm-8">
          <router-link to="/" class="brand-logo">
            <img class="img-responsive" src="../assets/img/logo.svg" alt="SUNRISE"/>
          </router-link>
        </div>
        <div class="col-sm-4">
          <!--<form id="form-search" action="#" class="search-box text-right">-->
            <!--<input name="q"-->
                   <!--type="search"-->
                   <!--placeholder="{{ $t('main.header.search') }}"-->
                   <!--id="search-input"-->
                   <!--class="search-field"-->
                   <!--required/>-->
            <!--<button type="submit" id="search-button" class="search-button">-->
              <!--<span class="icon-font icon-magnifying-glass"></span>-->
              <!--<span class="sr-only">{{ $t('main.header.search') }}</span>-->
            <!--</button>-->
          <!--</form>-->
        </div>
      </div>

      <div class="row">
        <div class="dropdown-megamenu navbar navbar-default">
          <div class="navbar-collapse collapse">
            <CategoriesMenu/>
              <!--{{#if header.location}}-->
              <!--<li class="visible-xs location-xs">-->
              <!--{{> common/location-selector-mobile location=header.location}}-->
              <!--</li>-->
              <!--{{/if}}-->
            <!--{{> common/nav-menu-extension navMenu=header.navMenu}}-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocationSelector from '@/components/LocationSelector.vue';
import CategoriesMenu from '@/components/CategoriesMenu.vue';
import LoginBoxHeader from '@/components/LoginBoxHeader.vue';

export default {
  components: {
    LocationSelector,
    CategoriesMenu,
    LoginBoxHeader,
  },
};
</script>

<!-- eslint-disable -->
<i18n>
  {
    "en": {
      "search": "Search",
      "stores": "Stores",
      "help": "Help",
      "callUs": "Call us on +44 123 456 000"
    },
    "de": {
      "search": "Suche",
      "stores": "Filiale",
      "help": "Hilfe",
      "callUs": "Rufen Sie uns auf +44 123 456 000 an"
    }
  }
</i18n>
