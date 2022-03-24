import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useLocation from 'hooks/useLocation';

export default {
  props: {
    money: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const { n } = useI18n();
    const { location } = useLocation();
    const formattedMoney = computed(() => {
      return n(amount.value, 'currency', location.value);
    });
    const amount = computed(() => {
      if (props?.money) {
        return (
          props.money.centAmount /
          10 ** props.money.fractionDigits
        );
      }
      return 0;
    });
    const currency = computed(() => {
      if (props?.money) {
        return props.money.currencyCode;
      }
      return '';
    });
    return { currency, amount, formattedMoney };
  },
};
