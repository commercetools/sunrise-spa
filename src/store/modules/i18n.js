import app from '@/main';

// Our default language that is preloaded
const loadedLanguages = ['en'];

function setLanguage(lang) {
  app.$i18n.locale = lang;
  document.documentElement.lang = lang;
  return lang;
}

function loadLanguageAsync(lang) {
  if (app.$i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}.json`)
        .then((msgs) => {
          app.$i18n.setLocaleMessage(lang, msgs.default);
          loadedLanguages.push(lang);
          return setLanguage(lang);
        });
    }
    return Promise.resolve(setLanguage(lang));
  }
  return Promise.resolve(lang);
}

export default {
  state: {

  },

  getters: {

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
