<template>
  <div class="col-sm-6 nopadding banner-left">
    <div class="aspect-ratio aspect-ratio--4to3">
      <picture>
        <source srcset="../../assets/img/banners/woman2-4to3.jpg" media="(min-width: 1200px)">
        <source srcset="../../assets/img/banners/woman2-4to3.jpg" media="(min-width: 768px)">
        <img src="../../assets/img/banners/woman2-4to3.jpg" class="img-responsive">
      </picture>
    </div>

    <div class="banner-text">
      <h4 class="banner-title">{{ $t('title') }}</h4>
      <p class="banner-paragraph">{{ $t('subtitle') }}</p>
      <a href="/products/women" class="btn banner-btn">
        {{ $t('linkLabel') }}
      </a>
    </div>
  </div>
</template>

<i18n>
en:
  title: "Summer Lovin'"
  subtitle: "Summer must have outfits"
  linkLabel: "Shop collection"
de:
  title: "Sommer Fashion"
  subtitle: "Beste Outfits für die Saison"
  linkLabel: "Jetzt bestellen"
</i18n>
