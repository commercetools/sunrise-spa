import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import TheHeader from '@/components/header/TheHeader.vue';
import HomePage from '@/components/home/HomePage.vue';
import ProductOverviewPage from '@/components/productoverview/ProductOverviewPage.vue';
import LoginPage from '@/components/login/LoginPage.vue';
import MyAccountPage from '@/components/useraccount/UserAccountPage.vue';
import NotFoundPage from '@/components/common/NotFoundPage.vue';
import ProductDetailPage from '@/components/productdetail/ProductDetailPage.vue';
import CartPage from '@/components/cart/Page.vue';

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
    {
      path: '/cart',
      name: 'cart',
      components: {
        default: CartPage,
        header: TheHeader,
      },
    },
  ],
});

const authGuard = async (to, from, next) => {
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (routeRequiresAuth && !store.state.authenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
};
router.beforeEach(authGuard);

export default router;
