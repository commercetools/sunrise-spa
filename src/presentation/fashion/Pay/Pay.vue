<script src="./Pay.js"></script>
<i18n src="./Pay.txt" lang="yaml"></i18n>


<template>
  <div v-if="orderComplete" class="pt-80 pb-100">
    <div class="container">
      <div class="order-complete text-center">
        <h2>{{ t('thankYou') }}</h2>
        <router-link class="mt-50" to="/">
          {{ t('continueShopping') }}
        </router-link>
      </div>
    </div>
  </div>
  <h1 v-else>...</h1>
</template>
