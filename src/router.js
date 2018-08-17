import Vue from 'vue';
import store from '@/store/store';
import Router from 'vue-router';
import TheHeader from '@/views/TheHeader.vue';
import HomePage from '@/views/HomePage.vue';
import ProductOverviewPage from '@/views/ProductOverviewPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import MyAccountPage from '@/views/MyAccountPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

Vue.use(Router);

function allowIfAuthenticated(to, from, next) {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next({ name: 'login' });
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      components: {
        default: NotFoundPage,
        header: TheHeader,
      },
    },
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
      path: '/login',
      name: 'login',
      components: {
        default: LoginPage,
        header: TheHeader,
      },
    },
    {
      path: '/user',
      name: 'user',
      components: {
        default: MyAccountPage,
        header: TheHeader,
      },
      beforeEnter: allowIfAuthenticated,
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
