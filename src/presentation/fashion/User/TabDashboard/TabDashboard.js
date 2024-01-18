import { useI18n } from 'vue-i18n';
import useCustomerTools from 'hooks/useCustomerTools';
import { onMounted } from 'vue';
import localMessages from './TabDashboard.json';

export default {
  setup() {
    const { t } = useI18n({messages: localMessages});
    const { customer, logout, refreshUser } =
      useCustomerTools();
    onMounted(() => {
      refreshUser();
    });
    //Can be used to get loyalty points (if implemented)
    // const points = computed(
    //   () =>
    //     customer?.value?.custom?.customFieldsRaw.find(
    //       ({ name }) => name === 'points'
    //     )?.value || 0
    // );
    return { t, customer, logout };
  },
};
