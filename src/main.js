import Vue from 'vue';
// Required until Cypress supports fetch API
// https://github.com/cypress-io/cypress/issues/95
import 'whatwg-fetch';
import Vuelidate from 'vuelidate';
import ProductZoomer from 'vue-product-zoomer';
import VueScrollTo from 'vue-scrollto';
import App from './App.vue';
import router from './router';
import store from './store';
import apolloProvider from './apollo';
import i18n from './i18n/i18n';
import sunriseConfig from '../sunrise.config';
import './registerServiceWorker';
import './assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.use(ProductZoomer);
Vue.use(Vuelidate);
Vue.use(VueScrollTo);
Vue.prototype.$sunrise = sunriseConfig;

new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
