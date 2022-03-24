import { useQuery } from '@vue/apollo-composable';
import { computed, ref, watch } from 'vue';
import { getValue } from '../src/lib';
//for some reason someone did not only thought it would
//  be a good idea for vue useQuery to have a completely
//  different api than React but it doesn't even fit
//  the vue options api (skip is called enabled)
const useFixOptions = (options) => {
  let fixed = { ...options };
  const enabled = computed(() =>
    getValue(options?.skip) ? !getValue(options.skip) : true
  );
  if (options.skip) {
    fixed = { ...options, enabled };
  }
  return fixed;
};
//adjust React useQuery to vue apollo
export default (
  query,
  { variables, onCompleted, ...options }
) => {
  const newOptions = useFixOptions(options);
  const data = ref();
  const { result, loading, error } = useQuery(
    query,
    variables,
    newOptions
  );
  const setData = (result) => {
    if (typeof onCompleted === 'function') {
      onCompleted(result);
    }
    data.value = result;
  };
  watch(result, setData);
  //make hot module reloading work
  if (getValue(result)) {
    setData(getValue(result));
  }
  return { data, loading, error };
};
