<i18n src="./TabDashboard.txt" lang="yaml"></i18n>
<script src="./TabDashboard.js"></script>

<template>
  <div v-if="customer" class="myaccount-content">
    <h3>Dashboard</h3>
    <div class="welcome">
      <p>
        {{ t('greeting') }},
        <strong
          >{{ customer.firstName }}
          {{ customer.lastName }}</strong
        >
        ({{ t('notYou') }} -
        <a
          href="javascript:;"
          @click.prevent="logout"
          class="logout"
          >{{ t('logout') }}</a
        >)
      </p>
    </div>

    <p class="mb-0">{{ t('description') }}</p>
  </div>
</template>
