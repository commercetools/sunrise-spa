<template>
  <div class="row">
    <div class="col-sm-7">
      <router-view class="checkout-form-step"/>
    </div>
    <div class="col-sm-5">
      <CartOverview/>
    </div>
  </div>
</template>

<script>
import CartOverview from './CartOverview.vue';

export default {
  components: { CartOverview },
};
</script>
