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
  this.currentPassword = { required };
  this.newPassword = { required };
  this.newPasswordConfirm = {
    sameAsPassword: (value) =>
      value === form.value.newPassword,
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
    const tools = useCustomerTools();
    const { t } = useI18n();
    const getErrorMessage = ({ code }) => {
      if (code === 'InvalidCurrentPassword') {
        return t('invalidPassword');
      }
      return t('unknownError');
    };
    const form = ref({});
    const rules = new Rules(form);
    const v = useVuelidate(rules, form);
    const updateCustomerPassword = () =>
      tools
        .updateMyCustomerPassword(form.value)
        .then(() => {
          form.value = {};
        });
    return {
      t,
      getErrorMessage,
      updateCustomerPassword,
      v,
      ...tools,
    };
  },
};
