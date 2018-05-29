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
                  <span class="sr-only">{{ $t("main.header.search") }}</span>
                </button>
              </li>
              <!-- End -->

              <li class="list-item-store">
                <router-link to="/stores"
                             class="store-select icon-marker">
                  <span class="hidden-xs">{{ $t("main.header.stores") }}</span>
                </router-link>
              </li>

              <li class="list-item-help">
                <a href="#"
                   class="link-help">
                  {{ $t("main.header.help") }}
                </a>
              </li>

              <li class="list-item-call">
                <a href="tel:0044123456000"
                   class="link-hotline">
                  {{ $t("main.header.callUs") }}
                </a>
              </li>

              <li class="list-item-bag">
                <!--{{> common/mini-cart miniCart=header.miniCart}}-->
              </li>

              <!--{{#if @root.meta.user.loggedIn}}-->
              <!--<li class="list-item-user">-->
              <!--<a href="{{@root.meta._links.logOut.href}}" class="link-user">-->
              <!--<span>{{ $t("main.header.signOut") }}</span>-->
              <!--</a>-->
              <!--</li>-->
              <!--<li class="list-item-user">-->
              <!--<a href="{{@root.meta._links.myAccount.href}}" class="link-user icon-user">-->
              <!--<span class="hidden-xs hidden-sm"-->
              <!--{{@root.meta.user.name}}-->
              <!--</span>-->
              <!--</a>-->
              <!--</li>-->
              <!--{{else}}-->
              <!--<li class="list-item-user">-->
              <!--<a href="{{@root.meta._links.signIn.href}}" class="link-user icon-user">-->
              <!--<span class="hidden-xs hidden-sm"-->
              <!--{{ $t("main.header.signIn") }}-->
              <!--</span>-->
              <!--</a>-->
              <!--</li>-->
              <!--{{/if}}-->

              <LocationSelector/>
            </ul>
          </div>
        </div>
      </header>
    </div>

    <div id="navigation" class="container">
      <div class="row logo-search">
        <div class="col-sm-8">
          <!--{{> common/logo}}-->
        </div>
        <div class="col-sm-4">
          <!--{{> common/search}}-->
        </div>
      </div>

      <div class="row">
        <div class="dropdown-megamenu navbar navbar-default">
          <div class="navbar-collapse collapse">
            <NavigationalCategories/>
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
import NavigationalCategories from '@/components/NavigationalCategories.vue';

export default {
  components: {
    LocationSelector,
    NavigationalCategories,
  },
};
</script>
