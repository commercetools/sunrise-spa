import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import TheHeader from '@/components/header/TheHeader.vue';
import PageHome from '@/components/home/PageHome.vue';
import PageProductOverview from '@/components/productoverview/PageProductOverview.vue';
import PageLogin from '@/components/login/PageLogin.vue';
import PageUserAccount from '@/components/useraccount/PageUserAccount.vue';
import PageNotFound from '@/components/common/PageNotFound.vue';
import PageProductDetail from '@/components/productdetail/PageProductDetail.vue';
import PageCartDetail from '@/components/cartdetail/PageCartDetail.vue';

Vue.use(Router);

const requiresAuth = true;

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      components: {
        default: PageNotFound,
        header: TheHeader,
      },
    },
    {
      path: '/',
      name: 'home',
      components: {
        default: PageHome,
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
        default: PageLogin,
        header: TheHeader,
      },
    },
    {
      path: '/products/:categorySlug',
      name: 'products',
      components: {
        default: PageProductOverview,
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
        default: PageUserAccount,
        header: TheHeader,
      },
      meta: { requiresAuth },
      props: {
        default: {
          showTab: 'TabPersonalDetails',
        },
      },
    },
    {
      path: '/user/orders',
      name: 'orders',
      components: {
        default: PageUserAccount,
        header: TheHeader,
      },
      meta: { requiresAuth },
      props: {
        default: {
          showTab: 'TabOrderList',
        },
      },
    },
    {
      path: '/user/orders/:orderNumber',
      name: 'order',
      components: {
        default: PageUserAccount,
        header: TheHeader,
      },
      meta: { requiresAuth },
      props: {
        default: {
          showTab: 'OrderDetail',
        },
      },
    },
    {
      path: '/product/:productSlug/:sku',
      name: 'product',
      components: {
        default: PageProductDetail,
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
        default: PageCartDetail,
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
