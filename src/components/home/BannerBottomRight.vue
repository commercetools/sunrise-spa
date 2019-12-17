<template>
  <div class="col-sm-6 noppading banner-right">
    <div class="row">
      <div class="col-sm-6 nopadding">
        <div class="banner-xs-one">
          <BannerPicture :file="'bottom-right-top-left.png'"/>
          <div class="banner-text">
            <h4 class="banner-title">
              <img src="../../assets/img/banners/sun-logo.png"/><br/><br/>
                {{ $t('title1') }}
            </h4>
          </div>
        </div>
      </div>
      <div class="col-sm-6 nopadding">
        <div class="banner-xs-two">
          <div class="aspect-ratio aspect-ratio--4to3">
            <BannerPicture :file="'bottom-right-top-right.jpg'"/>
          </div>
          <div class="banner-text">
            <h4 class="banner-title">{{ $t('title2') }}</h4>
            <p class="banner-paragraph">{{ $t('subtitle2') }}</p>
            <router-link :to="{ name: 'products', params: { categorySlug: 'accessories-men-sunglasses', page: 1 } }"
                         class="btn banner-btn">
              {{ $t('linkLabel') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 nopadding">
        <div class="banner-sm">
          <div class="aspect-ratio aspect-ratio--8to3">
            <BannerPicture :file="'bottom-right-bottom.jpg'"/>
          </div>
          <div class="banner-text">
            <h4 class="banner-title">{{ $t('title3')}}</h4>
            <p class="banner-paragraph">{{ $t('subtitle3') }}</p>
            <router-link :to="{ name: 'products', params: { categorySlug: 'women-clothing-sunglasses', page: 1 } }"
                         class="btn banner-btn">
              {{ $t('linkLabel') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerPicture from './BannerPicture.vue';

export default {
  components: { BannerPicture },
};
</script>

<i18n>
en:
  title1: "SUMMER FASHION"
  title2: "Trendy Sunglasses"
  title3: "Must to have it"
  subtitle2: "Accessories for the perfect summer"
  subtitle3: "Hot pieces for the summer"
  linkLabel: "Shop collection"
de:
  title1: "SOMMER MODE"
  title2: "Sonnenbrillen-Trends"
  title3: "Hauptsache überdimensional"
  subtitle2: "Unsere Fashion Must-Haves"
  subtitle3: "Trendy Sommer 2016 - Auffällige Sonnenbrillen"
  linkLabel: "Shop collection"
</i18n>
