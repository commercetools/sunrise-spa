<style src="./LoginButton.scss" lang="scss"></style>
<i18n src="./LoginButton.txt"></i18n>
<script src="./LoginButton.js"></script>

<template>
<div class="header-login component-same ml-30">
  <span class="dl-icon-user12"></span>
  <span v-if="showLoggedIn" class="hidden-xs">
    <button @click="logout" data-test="logout-button">
      <span>{{ $t("signOut") }}</span>
    </button>
  </span>
  <span v-if="showLoggedIn">
    <router-link :to="{ name: 'user' }" data-test="login-info-name">
      <span class="hidden-xs hidden-sm">{{ me.customer.firstName }}</span>
    </router-link>
  </span>
  <span v-else data-test="login-button">
    <router-link :to="{ name: 'login' }">
      <span class="hidden-xs hidden-sm">
        {{ $t("signIn") }}
      </span>
    </router-link>
  </span>
</div>
</template>
