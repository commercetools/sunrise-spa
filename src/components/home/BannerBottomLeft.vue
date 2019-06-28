<template>
  <div class="col-sm-6 nopadding banner-left">
    <div class="aspect-ratio aspect-ratio--4to3">
      <BannerPicture :file="'shoes-4to3.jpg'"/>
    </div>
    <div class="banner-text">
      <h4 class="banner-title">{{ $t('title') }}</h4>
      <p class="banner-paragraph">{{ $t('subtitle') }}</p>
      <a href="/products/women-shoes" class="btn banner-btn">
        {{ $t('linkLabel') }}
      </a>
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
  title: "Unique style for every season"
  subtitle: "Fashion styles"
  linkLabel: "Shop collection"
de:
  title: "Einzigartige Stücke für jede Saison"
  subtitle: "Lassen Sie sich inspirieren"
  linkLabel: "Shop collection"
</i18n>
