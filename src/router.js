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
import TabPersonalDetails from '@/components/useraccount/userdetail/TabPersonalDetails.vue';
import TabOrderList from '@/components/useraccount/myorders/TabOrderList.vue';
import TabOrderDetail from '@/components/useraccount/myorders/TabOrderDetail.vue';

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
      meta: { requiresAuth },
      components: {
        default: PageUserAccount,
        header: TheHeader,
      },
      children: [
        {
          path: 'orders', name: 'orders', component: TabOrderList,
        },
        {
          path: 'orders/:orderNumber', name: 'order', component: TabOrderDetail,
        },
        {
          path: 'account', alias: '', name: 'user', component: TabPersonalDetails,
        },
      ],
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
