import Vue from 'vue';
import Vuex from 'vuex';
import categories from '@/store/modules/categories';
import user from '@/store/modules/user';

Vue.use(Vuex);

const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export default new Vuex.Store({
  modules: {
    categories,
    user,
  },

  state: {
    country: 'de-DE',
    authenticated: false,
  },

  getters: {

  },

  actions: {
    setAuthenticated: ({ commit }, authenticated) => commit(SET_AUTHENTICATED, authenticated),
  },

  mutations: {
    [SET_AUTHENTICATED](state, authenticated) {
      state.authenticated = authenticated;
    },
  },
});
