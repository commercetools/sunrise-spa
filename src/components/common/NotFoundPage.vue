<template>
  <div class="home-page">
    <div class="container">
      <div class="search-not-found-title">
        <div class="search-results-title">{{ $t('title') }}</div>
        <div class="search-results">{{ $t('notFound') }}</div>
        <hr class="search-not-found-hr">
      </div>
      <div class="not-found-description-wrapper">
        <div class="not-found-description">{{ $t('description') }}</div>
      </div>
      <hr class="search-not-found-hr-bottom">
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>

<!-- eslint-disable -->
<i18n>
  {
    "en": {
      "title": "404",
      "notFound": "Page Not Found",
      "description": "The page you are looking for cannot be found."
    },
    "de": {
      "title": "404",
      "notFound": "Seite nicht gefunden",
      "description": "Die angeforderte Seite konnte leider nicht gefunden werden."
    }
  }
</i18n>