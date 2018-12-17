import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export default new Vuex.Store({
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
