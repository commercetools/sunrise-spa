import Vue from 'vue';
import Vuex from 'vuex';
import categories from './modules/categories';
import i18n from './modules/i18n';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    i18n,
  },

  state: {

  },

  getters: {

  },

  actions: {

  },

  mutations: {

  },
});
