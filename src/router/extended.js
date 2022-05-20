import Header from 'presentation/Header/Header.vue';
import Footer from 'presentation/Footer/Footer.vue';
import Products from 'presentation/ProductList/ProductList.vue';
import Product from 'presentation/PageProductDetail/PageProductDetail.vue';
import Checkout from 'presentation/PageCheckout/PageCheckout.vue';
import Login from 'presentation/Login/Login.vue';
import User from 'presentation/User/User.vue';
import TabDashboard from 'presentation/User/TabDashboard/TabDashboard.vue';
import TabAccountDetails from 'presentation/User/TabAccountDetails/TabAccountDetails.vue';
import TabChangePassword from 'presentation/User/TabChangePassword/TabChangePassword.vue';
import ForgotPassword from 'presentation/Login/ForgotPassword/ForgotPassword.vue';
import ResetPassword from 'presentation/User/ResetPassword/ResetPassword.vue';
import TabOrderList from 'presentation/User/TabOrderList/TabOrderList.vue';
import TabOrderDetail from 'presentation/User/TabOrderDetail/TabOrderDetail.vue';
import TabReturn from 'presentation/User/TabReturn/TabReturn.vue';
const requiresAuth = true;
export default [
  {
    path: 'products/:categorySlug/:page?',
    name: 'products',
    components: {
      default: Products,
      header: Header,
      // footer: null,
    },
  },
  {
    path: 'product/:productSlug/:sku',
    name: 'product',
    components: {
      default: Product,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'checkout',
    name: 'checkout',
    // meta: { requiresCart },
    components: {
      default: Checkout,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'login',
    name: 'login',
    components: {
      default: Login,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'forgot-password',
    name: 'forgot-password',
    components: {
      default: ForgotPassword,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'reset-password/:token',
    name: 'reset-password',
    components: {
      default: ResetPassword,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'user',
    meta: { requiresAuth },
    components: {
      default: User,
      header: Header,
      footer: Footer,
    },
    children: [
      {
        path: 'dashboard',
        alias: '',
        name: 'user',
        component: TabDashboard,
      },
      {
        path: 'order/:id',
        name: 'order',
        component: TabOrderDetail,
      },
      {
        path: 'return/:id',
        name: 'return',
        component: TabReturn,
      },
      {
        path: 'orders/:page?',
        name: 'orders',
        component: TabOrderList,
      },
      {
        path: 'account',
        name: 'account',
        component: TabAccountDetails,
      },
      {
        path: 'changepassword',
        name: 'changepassword',
        component: TabChangePassword,
      },
    ],
  },
];
