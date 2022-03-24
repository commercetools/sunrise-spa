import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  setup(_, { emit }) {
    const paymentMethod = ref('card');
    onMounted(() => emit('card-paid'));
    const { t } = useI18n();
    return { paymentMethod, t };
  },
};
