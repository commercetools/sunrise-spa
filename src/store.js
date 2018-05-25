import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_LANG = 'SET_LANG';

export default new Vuex.Store({
  state: {
    lang: 'en',
  },
  mutations: {
    [SET_LANG](state, payload) {
      this.$i18n.locale = payload;
    },
  },
  actions: {
    setLang({ commit }, payload) {
      commit(SET_LANG, payload);
    },
  },
});
