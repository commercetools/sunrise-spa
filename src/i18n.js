import { createI18n } from 'vue-i18n';
import config from '../sunrise.config';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  numberFormats: config.formats.number,
  //bug in vue i18n, wrong casing for this prop
  datetimeFormats: config.formats.datetime,
});

export default i18n;
