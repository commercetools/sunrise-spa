import Vue from 'vue';
import VueI18n from 'vue-i18n';
import sunriseConfig from '@/../sunrise.config';

Vue.use(VueI18n);

const fallbackLocale = sunriseConfig.languages ? Object.keys(sunriseConfig.languages)[0] : 'en';

function loadMessages() {
  const locales = require.context('@/i18n', true, /[a-z0-9]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([a-z0-9]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

function findInitialLocale() {
  const storedLocale = localStorage.getItem('locale');
  return storedLocale || fallbackLocale;
}

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'de-DE': {
    currency: {
      style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: findInitialLocale(),
  fallbackLocale,
  messages: loadMessages(),
  numberFormats,
});

i18n.vm.$watch('locale', (locale) => {
  document.documentElement.lang = locale;
  localStorage.setItem('locale', locale);
});

export default i18n;