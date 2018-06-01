import { loadLanguageAsync } from '@/setup/i18n-setup';

const SET_LANG = 'setLang';

export default {
  state: {

  },

  getters: {

  },

  actions: {
    setLang(context, locale) {
      context.commit(SET_LANG, locale);
    },
  },

  mutations: {
    [SET_LANG](state, locale) {
      loadLanguageAsync(locale);
    },
  },
};
