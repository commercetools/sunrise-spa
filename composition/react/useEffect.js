import { onMounted, watch } from 'vue';

const useEffect = (fn, deps) => {
  const newDeps = deps.filter(
    (dep) => typeof dep !== 'function'
  );
  onMounted(fn);
  watch(newDeps, fn);
};
export default useEffect;
