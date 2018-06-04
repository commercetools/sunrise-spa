import Vue from 'vue';
import VueI18n from 'vue-i18n';
import config from '@/../sunrise.config';

Vue.use(VueI18n);

const initialLocale = config.locales > 0 ? config.locales[0].code : 'en';

/* eslint import/no-dynamic-require: "off" */
const initialMsgs = require(`@/lang/${initialLocale}.json`);

// Our default language that is preloaded
const loadedLanguages = [initialLocale];

// Create VueI18n instance with options
export const i18n = new VueI18n({
  locale: initialLocale,
  fallbackLocale: initialLocale,
  messages: {
    [initialLocale]: initialMsgs,
  },
});

function setLanguage(lang) {
  i18n.locale = lang;
  document.documentElement.lang = lang;
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}.json`)
        .then((msgs) => {
          i18n.setLocaleMessage(lang, msgs.default);
          loadedLanguages.push(lang);
          return setLanguage(lang);
        });
    }
    return Promise.resolve(setLanguage(lang));
  }
  return Promise.resolve(lang);
}
