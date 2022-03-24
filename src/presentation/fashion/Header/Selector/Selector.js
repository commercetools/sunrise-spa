import { useI18n } from 'vue-i18n';

export default {
  name: 'Selector',
  props: ['values', 'title', 'value', 'setValue'],
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    return { t };
  },
};
