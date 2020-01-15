import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import TheHeader from './components/header/TheHeader.vue';
import TheFooter from './components/footer/TheFooter.vue';
import PageHome from './components/home/PageHome.vue';
import PageProductOverview from './components/productoverview/PageProductOverview.vue';
import PageLogin from './components/login/PageLogin.vue';
import PageUserAccount from './components/useraccount/PageUserAccount.vue';
import PageNotFound from './components/common/PageNotFound.vue';
import PageProductDetail from './components/productdetail/PageProductDetail.vue';
import PageCartDetail from './components/cartdetail/PageCartDetail.vue';
import TabPersonalDetails from './components/useraccount/userdetail/TabPersonalDetails.vue';
import TabOrderList from './components/useraccount/myorders/TabOrderList.vue';
import TabOrderDetail from './components/useraccount/myorders/TabOrderDetail.vue';
import TabChangePassword from './components/useraccount/changepassword/TabChangePassword.vue';
import ForgotPassword from './components/login/ForgotPassword.vue';
import ResetPassword from './components/login/ResetPassword.vue';

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
        footer: TheFooter,
      },
    },
    {
      path: '/',
      name: 'home',
      components: {
        default: PageHome,
        header: TheHeader,
        footer: TheFooter,
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
        footer: TheFooter,
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      components: {
        default: ForgotPassword,
        header: TheHeader,
        footer: TheFooter,
      },
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      components: {
        default: ResetPassword,
        header: TheHeader,
        footer: TheFooter,
      },
    },
    {
      path: '/products/:categorySlug',
      name: 'products',
      components: {
        default: PageProductOverview,
        header: TheHeader,
        footer: TheFooter,
      },
      props: {
        default: true,
        header: false,
        footer: false,
      },
    },
    {
      path: '/user',
      meta: { requiresAuth },
      components: {
        default: PageUserAccount,
        header: TheHeader,
        footer: TheFooter,
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
        {
          path: 'changepassword', name: 'changepassword', component: TabChangePassword,
        },
      ],
    },
    {
      path: '/product/:productSlug/:sku',
      name: 'product',
      components: {
        default: PageProductDetail,
        header: TheHeader,
        footer: TheFooter,
      },
      props: {
        default: true,
        header: false,
        footer: false,
      },
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        default: PageCartDetail,
        header: TheHeader,
        footer: TheFooter,
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
