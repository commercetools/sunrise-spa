<template>
  <div class="col-sm-6 nopadding banner-left">
    <div class="aspect-ratio aspect-ratio--4to3">
      <picture>
        <source srcset="../../assets/img/banners/shoes-4to3.jpg" media="(min-width: 1200px)">
        <source srcset="../../assets/img/banners/shoes-4to3.jpg" media="(min-width: 768px)">
        <img src="../../assets/img/banners/shoes-4to3.jpg" class="img-responsive">
      </picture>
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

<i18n>
en:
  title: "Unique style for every season"
  subtitle: "Fashion styles 2019"
  linkLabel: "Shop collection"
de:
  title: "Einzigartige Stücke für jede Saison"
  subtitle: "Lassen Sie sich inspirieren"
  linkLabel: "Shop collection"
</i18n>
