import Vue from 'vue';
import Vuex from 'vuex';
import categories from '@/store/modules/categories';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
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
