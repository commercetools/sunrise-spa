export const createReactive = (initial, setter) => {
  const ref = {};
  ref.value = initial;
  let listeners = new Map();
  const addListener = (fn) => {
    listeners.set(fn, fn);
    return () => listeners.delete(fn);
  };
  const setValue = (newValue) => {
    setter(newValue);
    ref.value = newValue;
    listeners.forEach((listener) => listener(newValue));
  };
  return {
    ref,
    setValue,
    addListener,
  };
};
