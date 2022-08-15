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
export const addVisibilityChangeListener = (() => {
  const checkStatus = () => {
    let hidden;
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      hidden = 'hidden';
    } else if (
      typeof document['msHidden'] !== 'undefined'
    ) {
      hidden = 'msHidden';
    } else if (
      typeof document['webkitHidden'] !== 'undefined'
    ) {
      hidden = 'webkitHidden';
    }
    return !document[hidden];
  };
  let visibilityChange;
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    visibilityChange = 'visibilitychange';
  } else if (typeof document['msHidden'] !== 'undefined') {
    visibilityChange = 'msvisibilitychange';
  } else if (
    typeof document['webkitHidden'] !== 'undefined'
  ) {
    visibilityChange = 'webkitvisibilitychange';
  }
  const handlers = new Map();
  const handler = () => {
    const status = checkStatus();
    handlers.forEach((handler) => handler(status));
  };
  document.addEventListener(
    visibilityChange,
    handler,
    false
  );
  return (handleVisibilityChange) => {
    handlers.set(
      handleVisibilityChange,
      handleVisibilityChange
    );
    return () => handlers.delete(handleVisibilityChange);
  };
})();
export default addVisibilityChangeListener;
