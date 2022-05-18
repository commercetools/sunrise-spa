import { onMounted, shallowRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    paymentMethod: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    onMounted(() => emit('card-paid'));
    const pm = shallowRef(props.paymentMethod);
    const { t } = useI18n();
    watch(pm, (pm) => {
      emit('payment-changed', pm);
    });
    return { pm, t };
  },
};
