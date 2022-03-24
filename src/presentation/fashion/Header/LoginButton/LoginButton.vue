<style src="./LoginButton.scss" lang="scss"></style>
<i18n src="./LoginButton.txt" lang="yaml"></i18n>
<script src="./LoginButton.js"></script>

<template>
  <div class="header-login component-same ml-10">
    <span v-if="showLoggedIn" data-test="login-info-name">
      <router-link
        :to="{ name: 'user' }"
        data-test="login-info-name"
      >
        <i class="dl-icon-user12"></i>
        <span class="target-text hidden-xs hidden-sm">{{
          t('myAccount')
        }}</span>
      </router-link>
    </span>
    <span v-else data-test="login-button">
      <router-link :to="{ name: 'login' }">
        <i class="dl-icon-user12"></i>
        <span class="target-text hidden-xs hidden-sm">{{
          t('signIn')
        }}</span>
      </router-link>
    </span>
  </div>
</template>
