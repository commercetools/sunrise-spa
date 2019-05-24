<template>
  <div class="col-sm-6 nopadding banner-right">
    <div class="aspect-ratio aspect-ratio--4to3">
      <picture>
        <source srcset="../../assets/img/banners/leather2-4to3.jpg" media="(min-width: 1200px)">
        <source srcset="../../assets/img/banners/leather2-4to3.jpg" media="(min-width: 768px)">
        <img src="../../assets/img/banners/leather2-4to3.jpg" class="img-responsive">
      </picture>
    </div>

    <div class="banner-text">
      <h4 class="banner-title">{{ $t('title') }}</h4>
      <p class="banner-paragraph">{{ $t('subtitle') }}</p>
      <a href="/products/women-bags" class="btn banner-btn">
        {{ $t('linkLabel') }}
      </a>
    </div>
  </div>
</template>

<i18n>
en:
  title: "Summer Essentials"
  subtitle: "Make the great day happen"
  linkLabel: "Shop collection"
de:
  title: "Sommer Essentials"
  subtitle: "Die wichtigsten Stücke des Sommer Trends"
  linkLabel: "Jetzt bestellen"
</i18n>
