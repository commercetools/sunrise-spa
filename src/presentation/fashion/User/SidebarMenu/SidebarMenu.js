import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import useCustomerTools from 'hooks/useCustomerTools';

export default {
  props: {},
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const activeTab = computed(() => {
      return route.name;
    });
    return { t, activeTab, ...useCustomerTools() };
  },
};
