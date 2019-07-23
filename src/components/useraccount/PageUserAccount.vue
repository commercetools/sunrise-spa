<template>
  <div class="my-account">
    <div class="container">
      <div class="my-account-title">
        <span class="my-account-title-text icon-user">{{ $t('title') }}</span>
      </div>
      <div class="row my-account-content">
        <SidebarMenu class="col-sm-3 col-md-2 col-xs-12 my-account-sidebar"/>
        <router-view class="col-sm-9 col-md-10 col-xs-12 my-account-tab"/>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenu.vue';

export default {
  components: { SidebarMenu },
};
</script>

<i18n>
en:
  title: "My Account"
de:
  title: "Mein Konto"
</i18n>
