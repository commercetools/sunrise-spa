import Vue from 'vue';
import Vuex from 'vuex';
import categories from '@/store/modules/categories';
import products from '@/store/modules/products';
import user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    products,
    user,
  },

  state: {
    country: 'de-DE',
  },

  getters: {

  },

  actions: {

  },

  mutations: {

  },
});
