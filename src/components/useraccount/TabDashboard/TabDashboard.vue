<i18n src="./TabDashboard.txt"></i18n>
<script src="./TabDashboard.js"></script>

<template>
  <div v-if="me" class="myaccount-content">
    <h3>Dashboard</h3>
    <div class="welcome">
      <p>
        {{ $t('greeting') }},
        <strong>{{me.customer.firstName}} {{me.customer.lastName}}</strong>
        ({{$t('notYou')}} -
        <a
          href="javascript:;"
          @click.prevent="logout"
          class="logout"
        >{{$t('logout')}}</a>)
      </p>
    </div>

    <p class="mb-0">{{$t('description')}}</p>
  </div>
</template>
