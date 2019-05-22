<template>
  <div class="col-sm-6 noppading banner-right">
    <div class="row">
      <div class="col-sm-6 nopadding">
        <div class="banner-xs-one">
          <picture>
            <source srcset="../../assets/img/banners/blue-bg-4to3.png" media="(min-width: 1200px)">
            <source srcset="../../assets/img/banners/blue-bg-4to3.png" media="(min-width: 768px)">
            <img src="../../assets/img/banners/blue-bg-4to3.png" class="img-responsive">
          </picture>
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
            <picture>
              <source srcset="../../assets/img/banners/sunglass-4to3.jpg"
                      media="(min-width: 1200px)">
              <source srcset="../../assets/img/banners/sunglass-4to3.jpg"
                      media="(min-width: 768px)">
              <img src="../../assets/img/banners/sunglass-4to3.jpg"
                   class="img-responsive">
            </picture>
          </div>
          <div class="banner-text">
            <h4 class="banner-title">{{ $t('title2') }}</h4>
            <p class="banner-paragraph">{{ $t('subtitle2') }}</p>
            <a href="/products/accessories-men-sunglasses" class="btn banner-btn">
              {{ $t('linkLabel') }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 nopadding">
        <div class="banner-sm">
          <div class="aspect-ratio aspect-ratio--8to3">
            <picture>
              <source srcset="../../assets/img/banners/woman-8to3.jpg" media="(min-width: 1200px)">
              <source srcset="../../assets/img/banners/woman-8to3.jpg" media="(min-width: 768px)">
              <img src="../../assets/img/banners/woman-8to3.jpg" class="img-responsive">
            </picture>
          </div>
          <div class="banner-text">
            <h4 class="banner-title">{{ $t('title3')}}</h4>
            <p class="banner-paragraph">{{ $t('subtitle3') }}</p>
            <a href="/products/women-clothing-sunglasses" class="btn banner-btn">
              {{ $t('linkLabel') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
en:
  title1: "SUMMER FASHION 2019"
  title2: "Trendy Sunglasses"
  title3: "Must to have it"
  subtitle2: "Accessories for the perfect summer"
  subtitle3: "Hot pieces for the summer"
  linkLabel: "Shop collection"
de:
  title1: "SOMMER MODE 2019"
  title2: "Sonnenbrillen-Trends 2019"
  title3: "Hauptsache überdimensional"
  subtitle2: "Unsere Fashion Must-Haves"
  subtitle3: "Trendy Sommer 2016 - Auffällige Sonnenbrillen"
  linkLabel: "Shop collection"
</i18n>
