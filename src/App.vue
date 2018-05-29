<template>
  <div id="app">
    <TheHeader/>
    <Home/>
    <!--{{> common/wishlist wishlist=content.wishlist}}-->
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import Home from '@/views/Home.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'app',
  components: {
    TheHeader,
    Home,
    TheFooter,
  },
};
</script>
