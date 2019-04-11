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
          <component :is="showTab"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenu.vue';
import TabPersonalDetails from './userdetail/TabPersonalDetails.vue';
import TabOrderList from './myorders/TabOrderList.vue';
import OrderDetail from './myorders/OrderDetail.vue';

export default {
  props: ['showTab'],

  components: {
    SidebarMenu,
    TabPersonalDetails,
    TabOrderList,
    OrderDetail,
  },
};
</script>

<i18n>
en:
  title: "My Account"
de:
  title: "Mein Konto"
</i18n>
