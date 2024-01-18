import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import useCustomerTools from 'hooks/useCustomerTools';
import localMessages from './SidebarMenu.json';

export default {
  props: {},
  setup() {
    const { t } = useI18n({messages: localMessages});
    const route = useRoute();
    const activeTab = computed(() => {
      return route.name;
    });
    return { t, activeTab, ...useCustomerTools() };
  },
};
