<i18n src="./TabPersonalDetails.txt"></i18n>
<script src="./TabPersonalDetails.js"></script>

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
    </div>
  </div>

</template>
