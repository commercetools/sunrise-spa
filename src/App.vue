<template>
  <div id="app">
    <header>
      <router-view name="header"/>
    </header>
    <router-view/>
    <!--{{> common/wishlist wishlist=content.wishlist}}-->
    <footer>
      <TheFooter/>
    </footer>
  </div>
</template>

<script>
import TheFooter from '@/components/footer/TheFooter.vue';

export default {
  name: 'app',
  components: {
    TheFooter,
  },
};
</script>
