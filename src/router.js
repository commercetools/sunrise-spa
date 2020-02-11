import Vue from 'vue';
import Router from 'vue-router';
import gql from 'graphql-tag';
import store from './store';
import apollo from './apollo';
import TheHeader from './components/header/TheHeader/index.vue';
import TheFooter from './components/footer/TheFooter/index.vue';
import TheCheckoutHeader from './components/header/TheCheckoutHeader/index.vue';
import TheCheckoutFooter from './components/footer/TheCheckoutFooter/index.vue';
import PageHome from './components/home/PageHome/index.vue';
import PageProductOverview from './components/productoverview/PageProductOverview/index.vue';
import PageLogin from './components/login/PageLogin/index.vue';
import ForgotPassword from './components/login/ForgotPassword/index.vue';
import ResetPassword from './components/login/ResetPassword/index.vue';
import PageUserAccount from './components/useraccount/PageUserAccount/index.vue';
import PageNotFound from './components/common/PageNotFound/index.vue';
import PageProductDetail from './components/productdetail/PageProductDetail/index.vue';
import PageCartDetail from './components/cartdetail/PageCartDetail/index.vue';
import TabPersonalDetails from './components/useraccount/userdetail/TabPersonalDetails/index.vue';
import TabOrderList from './components/useraccount/myorders/TabOrderList/index.vue';
import TabOrderDetail from './components/useraccount/myorders/TabOrderDetail/index.vue';
import TabChangePassword from './components/useraccount/changepassword/TabChangePassword/index.vue';
import PageCheckout from './components/checkout/PageCheckout/index.vue';
import StepWithOverview from './components/checkout/StepWithOverview/index.vue';
import StepShippingAddressForm from './components/checkout/StepShippingAddressForm/index.vue';
import StepBillingAddressForm from './components/checkout/StepBillingAddressForm/index.vue';
import StepShippingMethodForm from './components/checkout/StepShippingMethodForm/index.vue';
import StepPaymentMethodForm from './components/checkout/StepPaymentMethodForm/index.vue';
import StepPlaceOrderForm from './components/checkout/StepPlaceOrderForm/index.vue';
import { pageFromRoute } from './components/common/shared';


Vue.use(Router);

const requiresAuth = true;
const requiresCart = true;

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
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
      path: '/products/:categorySlug/:page?',
      name: 'products',
      components: {
        default: PageProductOverview,
        header: TheHeader,
        footer: TheFooter,
      },
      props: {
        default: route => ({
          ...pageFromRoute(route),
          categorySlug: route.params.categorySlug,
        }),
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
          path: 'order/:id', name: 'order', component: TabOrderDetail,
        },
        {
          path: 'orders/:page?',
          name: 'orders',
          component: TabOrderList,
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
    {
      path: '/checkout',
      meta: { requiresCart },
      components: {
        default: PageCheckout,
        header: TheCheckoutHeader,
        footer: TheCheckoutFooter,
      },
      children: [
        {
          path: '',
          component: StepWithOverview,
          children: [
            {
              path: 'payment', name: 'checkout-payment-method', component: StepPaymentMethodForm,
            },
            {
              path: 'shipping', name: 'checkout-shipping-method', component: StepShippingMethodForm,
            },
            {
              path: 'billing', name: 'checkout-billing-address', component: StepBillingAddressForm,
            },
            {
              path: 'address', alias: '', name: 'checkout', component: StepShippingAddressForm,
            },
          ],
        },
        {
          path: 'order', name: 'checkout-order', component: StepPlaceOrderForm,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (routeRequiresAuth && !store.state.authenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const routeRequiresCart = to.matched.some(record => record.meta.requiresCart);
  if (routeRequiresCart) {
    const hasCart = await apollo.defaultClient
      .query({ query: gql`{ me { activeCart { id } } }` })
      .then(result => !!result.data.me.activeCart);
    if (!hasCart) next('/');
  }
  next();
});

export default router;
