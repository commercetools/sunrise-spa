import { ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

function useDiscountCode() {
  const form = ref({});
  const rules = {
    code: { required },
  };

  const v = useVuelidate(rules, form);
  return { form, v };
}
export default useDiscountCode;
