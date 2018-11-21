import Vue from 'vue';
import store from '@/store/store';
import Router from 'vue-router';
import { refreshTokenExists } from '@/auth';
import TheHeader from '@/views/TheHeader.vue';
import HomePage from '@/views/HomePage.vue';
import ProductOverviewPage from '@/views/ProductOverviewPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import MyAccountPage from '@/views/MyAccountPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import ProductDetailPage from '@/views/ProductDetailPage.vue';

Vue.use(Router);

const requiresAuth = true;

const router = new Router({
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
    {
      path: '/user',
      name: 'user',
      components: {
        default: MyAccountPage,
        header: TheHeader,
      },
      meta: { requiresAuth },
    },
    {
      path: '/product/:productSlug/:sku',
      name: 'product',
      components: {
        default: ProductDetailPage,
        header: TheHeader,
      },
      props: {
        default: true,
        header: false,
      },
    },
  ],
});

const isNotAuthenticated = () => !store.getters.isAuthenticated;

const authGuard = async (to, from, next) => {
  if (isNotAuthenticated() && refreshTokenExists()) {
    await store.dispatch('fetchCustomer');
  }
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (routeRequiresAuth && isNotAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
};
router.beforeEach(authGuard);

export default router;
