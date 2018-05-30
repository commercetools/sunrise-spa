<template>
  <div id="app">
    <router-view name="header"/>
    <router-view/>
    <!--{{> common/wishlist wishlist=content.wishlist}}-->
    <TheFooter/>
  </div>
</template>

<script>
import TheFooter from '@/views/TheFooter.vue';

export default {
  name: 'app',
  components: {
    TheFooter,
  },
};
</script>
