<template>
   <div :class="{ 'col-sm-9': showTab.showPersonalDetails,
                  'col-sm-12': showTab.showMyOrders }">
    <div class="row">
      <div class="col-sm-3">
        <!--{{> myaccount/my-account-sidebar myPersonalDetailsTab=true}}-->
        <SidebarMenu :showTab="showTab"/>
      </div>
        <div v-if="showTab.showPersonalDetails">
          <PersonalDetails/>
        </div>
        <div v-if="showTab.showMyOrders">
          <MyOrders/>
        </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenu.vue';
import PersonalDetails from './PersonalDetails.vue';
import MyOrders from './MyOrders.vue';

export default {
  props: ['showTab'],
  components: { SidebarMenu, PersonalDetails, MyOrders },
};
</script>
