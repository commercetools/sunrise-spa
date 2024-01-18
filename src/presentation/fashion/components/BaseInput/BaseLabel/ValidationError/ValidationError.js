import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import localMessages from './ValidationError.json'

export default {
  props: {
    vuelidate: {
      type: Object,
      required: true,
    },
    customErrors: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const { t, te } = useI18n({messages: localMessages});
    const validations = computed(() => {
      const errors = props.vuelidate.$errors.map(
        ({ $validator }) => $validator
      );
      return errors;
    });
    function getErrorMessage(validation) {
      return te(validation)
        ? //@todo: what about max/min ... length, where do we get parameter from?
          t(validation, '')
        : t('unknownValidation');
    }
    return { validations, getErrorMessage };
  },
};
