import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
// import BaseSelect from '../../common/form/BaseSelect/BaseSelect.vue';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import useBaseAddress from 'hooks/useBaseAddress';

export default {
  props: {
    address: {
      type: Object,
      required: false,
    },
  },
  components: {
    BaseInput,
    // BaseSelect,
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const { form, v } = useBaseAddress();
    v.value.$touch();
    watch(
      form,
      (form) => {
        emit(
          'update-address',
          JSON.parse(JSON.stringify(form))
        );
      },
      { deep: true }
    );
    const validForm = computed(() => {
      return !v.value.$invalid;
    });
    watch(validForm, (validForm) => {
      emit('valid-form', validForm);
    });

    return { t, form, validForm, v };
  },
};
