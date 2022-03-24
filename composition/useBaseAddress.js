import { ref } from 'vue';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

function useBaseAddress() {
  const form = ref({});
  const rules = {
    firstName: { required, $lazy: true },
    lastName: { required, $lazy: true },
    streetName: { required, $lazy: true },
    additionalStreetInfo: {},
    postalCode: { required, $lazy: true },
    city: { required, $lazy: true },
    phone: {},
    email: { required, email, $lazy: true },
  };

  const v = useVuelidate(rules, form);
  return { form, v };
}
export default useBaseAddress;
