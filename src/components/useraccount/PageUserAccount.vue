<template>
  <div class="my-account">
    <div class="container">
      <div class="my-account-title">
        <span class="my-account-title-text icon-user">{{ $t('title') }}</span>
      </div>
      <div class="row">
        <div class="my-account-content col-sm-12">
          <div class="col-sm-3">
            <SidebarMenu :showTab="showTab"/>
          </div>
          <component :is="showTab"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenu.vue';
import PersonalDetails from './PersonalDetails.vue';
import MyOrders from './MyOrders.vue';
import PageOrderDetails from './orderdetail/PageOrderDetails.vue';

export default {
  props: ['showTab', 'orderNumber'],
  name: 'UserAccount',
  components: {
    SidebarMenu, PersonalDetails, MyOrders, PageOrderDetails,
  },
};
</script>

<i18n>
en:
  title: "My Account"
de:
  title: "Mein Konto"
</i18n>
