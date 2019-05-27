<template>
  <div class="col-sm-6 nopadding banner-left">
    <div class="aspect-ratio aspect-ratio--4to3">
      <picture>
        <source :srcset="link" media="(min-width: 1200px)">
        <source :srcset="link">
        <img :src="link" class="img-responsive">
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

<script>
export default {
  computed: {
    link() {
      /* eslint-disable import/no-dynamic-require */
      /* eslint-disable global-require */
      return require(`../../assets/img/banners/${this.$i18n.locale}/woman-4to3.jpg`);
    },
  },
};
</script>

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
