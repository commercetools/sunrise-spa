import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
import LoadingButton from 'presentation/components/LoadingButton/LoadingButton.vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import useCustomerTools from 'hooks/useCustomerTools';
function Rules(form) {
  const sameAs = (value) =>
    value === form.value.newPassword;
  this.newPassword = { required };
  this.confirmPassword = {
    required,
    sameAsPassword: sameAs,
  };
}

export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  setup() {
    const { t } = useI18n();
    const form = ref({});
    const rules = new Rules(form);
    const v = useVuelidate(rules, form);
    const { resetPassword: rp, token } = useCustomerTools();
    const resetPassword = () =>
      rp({
        token,
        newPassword: form.value.newPassword,
      });

    function getErrorMessage({ code }) {
      if (code === 'InvalidSubject') {
        return t('invalidSubject');
      }
      return t('unknownError');
    }

    return {
      t,
      v,
      resetPassword,
      getErrorMessage,
    };
  },
};
