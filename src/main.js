import Vue from 'vue';
// Required until Cypress supports fetch API
// https://github.com/cypress-io/cypress/issues/95
import 'whatwg-fetch';
import VueScrollTo from 'vue-scrollto';
import Vuelidate from 'vuelidate';
import ProductZoomer from 'vue-product-zoomer';
import App from './App.vue';
import router from './router';
import store from './store';
import apolloProvider from './apollo';
import i18n from './i18n/i18n';
import sunriseConfig from '../sunrise.config';
import './registerServiceWorker';
import './assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.use(VueScrollTo);
Vue.use(ProductZoomer);
Vue.use(Vuelidate);
Vue.directive('vpshow', {
  /* eslint-disable no-param-reassign */
  bind(el, binding) {
    el.$onScroll = function onScroll() {
      binding.value(el);
    };
    document.addEventListener('scroll', el.$onScroll);
  },

  inserted(el) {
    el.$onScroll();
  },

  unbind(el) {
    document.removeEventListener('scroll', el.$onScroll);
    delete el.$onScroll;
  },
  /* eslint-enable no-param-reassign */
});


Vue.prototype.$sunrise = sunriseConfig;

new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
