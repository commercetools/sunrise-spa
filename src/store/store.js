import Vue from 'vue';
import Vuex from 'vuex';
import categories from '@/store/modules/categories';
import user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
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
