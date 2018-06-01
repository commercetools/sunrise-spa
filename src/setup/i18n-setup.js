import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '@/lang/en.json';

Vue.use(VueI18n);

// Create VueI18n instance with options
export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
  },
});

export const availableLanguages = ['en', 'de'];
