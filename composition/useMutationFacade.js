import { useMutation } from '@vue/apollo-composable';
import { shallowRef } from 'vue';
const useMutationFacade = (query) => {
  const data = shallowRef(null);
  const { mutate, ...rest } = useMutation(query);
  rest.onDone((result) => (data.value = result.data));
  const newMutate = ({ variables, ...options } = {}) =>
    mutate(variables, options);
  return [newMutate, { ...rest, data }];
};
export default useMutationFacade;
