<template>
  <div class="my-account">
    <div class="container">
      <div class="my-account-title">
        <span class="my-account-title-text icon-user">{{ $t('title') }}</span>
      </div>
      <div class="row">
        <div class="col-sm-9">
          <div class="my-account-content">
            <UserProfile/>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="my-account-banners">
            <div class="banner-one-wrapper hidden-xs">
              <div class="my-account-banner">
                <div class="banner-title">
                  {{ $t('bannerOne.title') }}
                </div>
                <hr class="banner-hr">
                <div class="banner-subtitle">
                  {{ $t('bannerOne.subtitle') }}
                </div>
                <div class="banner-btn-wrapper">
                  <!--<a class="banner-btn" href="{{content.bannerOne.url}}">-->
                    <!--{{ $t('bannerOne.link') }}-->
                  <!--</a>-->
                </div>
              </div>
            </div>
            <div class="banner-two-wrapper">
              <div class="my-account-banner image-banner">
                <div class="banner-title">
                  {{ $t('bannerTwo.title') }}
                </div>
                <hr class="banner-hr">
                <div class="banner-subtitle">
                  {{ $t('bannerTwo.subtitle') }}
                </div>
                <div class="banner-btn-wrapper">
                  <!--<a class="banner-btn" href="{{content.bannerTwo.url}}">-->
                    <!--{{ $t('bannerTwo.link') }}-->
                  <!--</a>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfile from './UserProfile.vue';

export default {
  name: 'MyAccount',
  components: { UserProfile },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "title": "My Account",
    "bannerOne": {
      "title": "Your Sunrise",
      "subtitle": "Make the great days happen",
      "link": "Shop All"
    },
    "bannerTwo": {
      "title": "Your Sunrise",
      "subtitle": "Make the great days happen",
      "link": "Shop All"
    }
  },
  "de": {
    "title": "Mein Konto",
    "bannerOne": {
      "title": "Dein Sunrise",
      "subtitle": "Urlaub in der Sonne",
      "link": "Alles bestellen"
    },
    "bannerTwo": {
      "title": "Sunrise Shop",
      "subtitle": "Neue Saison, neuer Style",
      "link": "Alles bestellen"
    }
  }
}
</i18n>
