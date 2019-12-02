<template>
  <div v-if="me">
    <div class="row">
      <div class="personal-details col-md-8 col-sm-12">
        <div class="personal-details-text-one">
          <span>{{ $t('welcomeBack', { name: me.customer.firstName }) }}</span>
        </div>
        <div class="personal-details-text-two">
          {{ $t('customerNumber') }}: <span class="customer-number">{{ me.customer.customerNumber }}</span>
        </div>
        <EditProfileForm/>
      </div>
      <div class="col-md-4 hidden-sm">
        <div class="my-account-banners">
          <div class="banner-one-wrapper hidden-xs">
            <div class="my-account-banner">
              <div class="banner-title">{{ $t('bannerOne.title') }}</div>
              <hr class="banner-hr">
              <div class="banner-subtitle">{{ $t('bannerOne.subtitle') }}</div>
              <div class="banner-btn-wrapper">
                <!--<a class="banner-btn" href="{{content.bannerOne.url}}">-->
                <!--{{ $t('bannerOne.link') }}-->
                <!--</a>-->
              </div>
            </div>
          </div>
          <div class="banner-two-wrapper">
            <div class="my-account-banner image-banner">
              <div class="banner-title">{{ $t('bannerTwo.title') }}</div>
              <hr class="banner-hr">
              <div class="banner-subtitle">{{ $t('bannerTwo.subtitle') }}</div>
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
</template>

<script>

import gql from 'graphql-tag';
import EditProfileForm from './EditProfileForm.vue';

export default {
  components: { EditProfileForm },

  data: () => ({
    me: null,
  }),

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            customer {
              id
              firstName
              customerNumber
            }
          }
        }`,
    },
  },
};
</script>

<i18n>
en:
  welcomeBack: "Hello, {name}"
  customerNumber: "Customer number"
  subscribedToNewsletter: "Subscribed to weekly newsletter"
  bannerOne:
    title: "Your Sunrise"
    subtitle: "Make the great days happen"
    link: "Shop All"
  bannerTwo:
    title: "Your Sunrise"
    subtitle: "Make the great days happen"
    link: "Shop All"
de:
  welcomeBack: "Hallo, {name}"
  customerNumber: "Kundennummer"
  subscribedToNewsletter: "Subscribed to weekly newsletter"
  bannerOne:
    title: "Dein Sunrise"
    subtitle: "Urlaub in der Sonne"
    link: "Alles bestellen"
  bannerTwo:
    title: "Sunrise Shop"
    subtitle: "Neue Saison, neuer Style"
    link: "Alles bestellen"
</i18n>
