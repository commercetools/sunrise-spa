import Header from 'presentation/Header/Header.vue';
import Footer from 'presentation/Footer/Footer.vue';
import Cart from 'presentation/CartDetail/CartDetail.vue';
import Home from 'presentation/Home/Home.vue';
import StoreLocator from 'presentation/Stores/StoreLocator.vue';
export default [
  {
    path: 'cart',
    name: 'cart',
    components: {
      default: Cart,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: '',
    name: 'home',
    components: {
      default: Home,
      header: Header,
      footer: Footer,
    },
  },
  {
    path: 'stores',
    name: 'stores',
    components: {
      default: StoreLocator,
      header: Header,
      footer: Footer,
    },
  },
];
