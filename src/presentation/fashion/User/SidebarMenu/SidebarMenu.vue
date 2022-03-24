<style src="./SidebarMenu.scss" lang="scss" scoped></style>
<i18n src="./SidebarMenu.txt" lang="yaml"></i18n>
<script src="./SidebarMenu.js"></script>

<template>
  <div class="myaccount-tab-menu nav" role="tablist">
    <router-link
      :class="activeTab === 'user' ? 'active' : ''"
      :to="{ name: 'user' }"
      >{{ t('dashboard') }}</router-link
    >
    <router-link
      :class="activeTab === 'account' ? 'active' : ''"
      :to="{ name: 'account' }"
      >{{ t('accountDetails') }}</router-link
    >
    <router-link
      :class="activeTab === 'orders' ? 'active' : ''"
      :to="{ name: 'orders' }"
      data-test="my-orders-button"
      >{{ t('myOrders') }}</router-link
    >
    <router-link
      :class="
        activeTab === 'changepassword' ? 'active' : ''
      "
      :to="{ name: 'changepassword' }"
      data-test="change-password-button"
      >{{ t('changePassword') }}</router-link
    >
    <a
      href="#"
      @click.prevent="logout"
      data-test="sign-out"
    >
      {{ t('signOut') }}
    </a>
  </div>
</template>
