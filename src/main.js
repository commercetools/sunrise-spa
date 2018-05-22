import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { apolloProvider } from './vue-apollo';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');
