import Vue from 'vue';
import App from '@/App.vue';
import SelectBoxIt from '@/components/global/SelectBoxIt.vue';
import Vuelidate from 'vuelidate';
import router from '@/router';
import store from '@/store/store';
import '@/registerServiceWorker';
import createProvider from '@/apollo';
import i18n from '@/i18n/i18n';
import sunriseConfig from '@/../sunrise.config';

import './assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

Vue.component('SelectBoxIt', SelectBoxIt);

Vue.prototype.$sunrise = sunriseConfig;

export const apolloProvider = createProvider();

export default new Vue({
  el: '#app',
  router,
  store,
  i18n,
  provide: apolloProvider.provide(),
  render: h => h(App),
});
