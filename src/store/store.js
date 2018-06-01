import Vue from 'vue';
import Vuex from 'vuex';
import categories from './modules/categories';
import languages from './modules/languages';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    languages,
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
