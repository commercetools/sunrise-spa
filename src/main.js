import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import { apolloProvider } from './vue-apollo';
import i18n from './i18n/i18n';

import './assets/scss/main.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');
