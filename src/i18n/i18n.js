import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store, { fallbackLocale } from '../store';
import sunriseConfig from '../../sunrise.config';

Vue.use(VueI18n);

function loadMessages() {
  const locales = require.context('@/i18n', true, /[a-z0-9]+\.yaml$/i);
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

const i18n = new VueI18n({
  locale: store.state.locale,
  fallbackLocale,
  messages: loadMessages(),
  numberFormats: sunriseConfig.formats.number,
  dateTimeFormats: sunriseConfig.formats.datetime,
});

store.watch((state) => state.locale, (value) => {
  i18n.locale = value;
  document.documentElement.lang = value;
});

export default i18n;
