import {
  required,
  email,
  minLength,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
// import LoadingButton from '../../common/form/LoadingButton/LoadingButton.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useCustomerTools from 'hooks/useCustomerTools';
function Rules(form) {
  this.firstName = { required };
  this.lastName = { required };
  this.email = { required, email };
  this.password = { required, minLength: minLength(5) };
  this.repeatPassword = {
    sameAsPassword: (value) =>
      value === form.value.password,
  };
  this.agreeToTerms = {
    required,
    mustBeAgreed: (value) => value === true,
  };
}

export default {
  components: {
    ServerError,
    BaseInput,
    BaseForm,
  },
  props: {},
  setup() {
    const { t } = useI18n();
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreeToTerms: true,
    });
    const rules = new Rules(form);
    const v = useVuelidate(rules, form);
    const tools = useCustomerTools();
    const customerSignMeUp = () => tools.signup(form.value);

    const getErrorMessage = ({ code, field }) => {
      if (code === 'DuplicateField' && field === 'email') {
        return t('duplicatedEmail');
      }
      return t('unknownError');
    };
    const change = (key, val) => {
      form.value = { ...form.value, [key]: val };
    };
    return {
      change,
      t,
      v,
      customerSignMeUp,
      getErrorMessage,
    };
  },
};
