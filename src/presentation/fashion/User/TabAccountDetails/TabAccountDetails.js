import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useCustomerTools from 'hooks/useCustomerTools';
function Rules() {
  this.email = { required, email };
  this.firstName = { required };
  this.lastName = { required };
}
export default {
  components: {
    BaseInput,
    BaseForm,
    ServerError,
  },
  setup() {
    const { t } = useI18n();
    const tools = useCustomerTools();
    const form = ref({
      ...tools.customer.value,
    });
    const rules = new Rules();
    const v = useVuelidate(rules, form);
    const updateCustomerProfile = () => {
      return tools.updateUser(form.value);
    };
    return { t, v, updateCustomerProfile };
  },
};
