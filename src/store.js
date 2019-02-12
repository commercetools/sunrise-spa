import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
const SET_MINI_CART_OPEN = 'SET_MINI_CART_OPEN';

const clearMiniCartTimeout = (state) => {
  if (state.miniCartCloseTimer !== 0) {
    clearTimeout(state.miniCartCloseTimer);
  }
};

const setMiniCartTimeout = (commit, state, timeout) => {
  state.miniCartCloseTimer = setTimeout(() => commit(SET_MINI_CART_OPEN, false), timeout);
};

export default new Vuex.Store({
  state: {
    country: 'de-DE',
    authenticated: false,
    miniCartOpen: false,
    miniCartCloseTimer: 0,
  },

  getters: {

  },

  actions: {
    setAuthenticated: ({ commit }, authenticated) => commit(SET_AUTHENTICATED, authenticated),

    openMiniCart: ({ commit, state }, timeout = 2000) => {
      clearMiniCartTimeout(state);
      commit(SET_MINI_CART_OPEN, true);
      if (timeout !== 0) {
        setMiniCartTimeout(commit, state, timeout);
      }
    },

    closeMiniCart: ({ commit, state }, timeout = 0) => {
      clearMiniCartTimeout(state);
      if (timeout !== 0) {
        setMiniCartTimeout(commit, state, timeout);
      } else {
        commit(SET_MINI_CART_OPEN, false);
      }
    },

    toggleMiniCart: ({ commit, state }) => commit(SET_MINI_CART_OPEN, !state.miniCartOpen),
  },

  mutations: {
    [SET_AUTHENTICATED](state, authenticated) {
      state.authenticated = authenticated;
    },

    [SET_MINI_CART_OPEN](state, miniCartOpen) {
      state.miniCartOpen = miniCartOpen;
    },
  },
});
