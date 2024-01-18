import { useI18n } from 'vue-i18n';
import useCustomerTools from 'hooks/useCustomerTools';
import localMessages from './LoginButton.json';

export default {
  props: {},
  setup() {
    const { t } = useI18n({messages: localMessages});
    const { showLoggedIn } = useCustomerTools();
    return { t, showLoggedIn };
  },
};
