import Vue from 'vue';
import App from '@/App.vue';
import SelectBoxIt from '@/components/common/SelectBoxIt.vue';
import Vuelidate from 'vuelidate';
import router from '@/router';
import store from '@/store/store';
import '@/registerServiceWorker';
import apolloProvider from '@/apollo';
import i18n from '@/i18n/i18n';
import sunriseConfig from '@/../sunrise.config';
import ProductZoomer from 'vue-product-zoomer';

import '@/assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.use(ProductZoomer);
Vue.use(Vuelidate);

Vue.component('SelectBoxIt', SelectBoxIt);

Vue.prototype.$sunrise = sunriseConfig;

new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
