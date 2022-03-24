import { ref } from 'vue';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

function useResetPasswordForm() {
  const form = ref({
    email: '',
  });
  const rules = {
    email: { required, email, $lazy: true },
  };

  const v = useVuelidate(rules, form);
  return { form, v };
}
export default useResetPasswordForm;
