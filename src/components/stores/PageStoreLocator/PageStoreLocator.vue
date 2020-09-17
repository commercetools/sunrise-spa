<i18n src="./PageStoreLocator.txt"></i18n>
<script src="./PageStoreLocator.js" />
<style lang="scss" src="./PageStoreLocator.scss"></style>
<template>
  <div class="store-finder-wrapper">
    <Breadcrumb categorySlug="stores" />
    <div class="container pt-50">
      <div class="store-location-wrapper">
        <div class="map">
          <div id="map">
            <gmap-map
              :center="center"
              :zoom="12"
              style="width:100%;  height: 100%;"
            >
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                @click="center = m.position"
              >
              </gmap-marker>
            </gmap-map>
          </div>
        </div>

        <div>
          <div id="googlePlaceBar">
            <h4>{{ $t('search') }}</h4>
            <div id="place-radius">
              <gmap-autocomplete id="place-input" @place_changed="setPlace" />
              <select v-model="searchRadius" id="radius">
                <option
                  v-for="opt in radiusOptions"
                  :key="opt.distance"
                  :value="opt.distance"
                  >{{ opt.label }}</option
                >
              </select>
            </div>
          </div>
          <h3>Stores</h3>
          <div class="addresses">
            <ul
              class="list"
              v-if="channels && channels.results && channels.results.length > 0"
            >
              <li
                v-for="channel in channels.results"
                :key="channel.id"
                class="item address address--active mb-15"
                @click="click(channel)"
              >
                <div class="item-link">
                  <span class="distance mb-15">
                    <span
                      class="gm-computed-distance"
                      :data-coord-lat="channel.geoLocation.coordinates[1]"
                      :data-coord-lng="channel.geoLocation.coordinates[0]"
                    ></span>
                    <strong
                      class="title text-center"
                      data-test="store-name"
                    >
                      {{ channel.name }}
                    </strong>
                    <div class="text-center store-distance">
                      {{ distance(channel) }} mi away
                    </div>
                  </span>
                  <b class="price"> </b>
                  <div class="info">
                    <div class="info-title">Address:</div>
                    <div class="info-content">
                      {{ channel.address.streetNumber }}
                      {{ channel.address.streetName }} <br />
                      {{ channel.address.city }},
                      {{ channel.address.postalCode }}
                    </div>
                    <div class="info-title">Opening hours:</div>
                    <div class="info-content">{{ openingHours(channel) }}</div>

                    <!-- <div class="info-content"> Mo-Fr. 10:00AM - 8:00PMSa. 9:00AM - 6:00PM </div> -->
                  </div>
                  <div class="box-footer">
                    <!-- start catalog/product-availability.hbs -->
                    <!-- end catalog/product-availability.hbs -->
                    <div class="action text-center" v-if="!isSelected(channel)">
                      <input type="hidden" :value="channel.id" />
                      <button
                        v-on:click="setStore"
                        class="selectBtn"
                        :value="channel.id"
                        data-test="select-store"
                      >
                        Select This Store
                      </button>
                    </div>
                    <div
                      class="text-center store-selected action"
                      v-on:click="unsetStore"
                      v-else
                      data-test="unselect-store"
                    >
                      Selected
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="no-stores-found" v-else>
              No stores found. Try increasing your search radius.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
