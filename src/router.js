import Vue from 'vue';
import Router from 'vue-router';
import TheHeader from '@/views/TheHeader.vue';
import HomePage from '@/views/HomePage.vue';
import ProductOverviewPage from '@/views/ProductOverviewPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomePage,
        header: TheHeader,
      },
    },
    {
      path: '/stores',
      name: 'stores',
    },
    {
      path: '/products/:categorySlug',
      name: 'products',
      components: {
        default: ProductOverviewPage,
        header: TheHeader,
      },
      props: {
        default: true,
        header: false,
      },
    },
  ],
});
