import { useI18n } from 'vue-i18n';
import useCustomerTools from 'hooks/useCustomerTools';

export default {
  props: {},
  setup() {
    const { t } = useI18n();
    const { showLoggedIn } = useCustomerTools();
    return { t, showLoggedIn };
  },
};
