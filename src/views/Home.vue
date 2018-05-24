<template>
  <div>
    <div class="home-page">

      <!--{{> catalog/home/home-banners}}-->

      <div class="container">
        <!--{{> catalog/home/home-suggestions}}-->

        <div class="home-viewall">
          <!--{{> catalog/home/view-products-link}}-->
        </div>
      </div>
    </div>
    <!--{{> common/wishlist wishlist=content.wishlist}}-->

    <div class="home">
    <ApolloExample/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ApolloExample from '@/components/ApolloExample.vue';

export default {
  name: 'home',
  components: {
    ApolloExample,
  },
};
</script>
