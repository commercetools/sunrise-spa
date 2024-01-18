import { useI18n } from 'vue-i18n';
import localMessages from './Footer.json';

export default {
  name: 'Footer',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
      messages: localMessages
    });
    return { t };
  },
};
