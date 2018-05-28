import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '@/lang/en';

Vue.use(VueI18n);

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
  },
});

function setLanguage(lang) {
  i18n.locale = lang;
  document.documentElement.lang = lang;
  return lang;
}

// Our default language that is preloaded
const loadedLanguages = ['en'];

export const availableLanguages = ['en', 'de'];

export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then((msgs) => {
        i18n.setLocaleMessage(lang, msgs.default);
        loadedLanguages.push(lang);
        return setLanguage(lang);
      });
    }
    return Promise.resolve(setLanguage(lang));
  }
  return Promise.resolve(lang);
}

export default i18n;
