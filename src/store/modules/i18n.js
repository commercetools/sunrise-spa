import { i18n, loadLanguageAsync } from '../../setup/i18n-setup';

export default {
  state: {

  },

  getters: {
    locale() {
      return i18n.locale;
    },
  },

  actions: {
    setLang(context, locale) {
      loadLanguageAsync(locale)
        .catch(error => console.error('Could not change language.', error));
    },
  },

  mutations: {

  },
};
