import { useI18n } from 'vue-i18n';
import localMessages from './Selector.json';

export default {
  name: 'Selector',
  props: ['values', 'title', 'value', 'setValue'],
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
      messages: localMessages
    });
    return { t };
  },
};
