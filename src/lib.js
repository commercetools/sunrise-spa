export const move = (router, route, params, fn) =>
  router[fn]({
    ...route,
    params,
  });
//in React you can just return the observable
//  because React does not usually have observable
//  in React it will be: export const getValue = (observable) => observable;
export const getValue = (observable) => {
  try {
    'value' in observable;
    return observable.value;
  } catch (e) {
    return observable;
  }
};
export const memoize = (fn) => {
  let lastArgs = [];
  let lastReturn;
  return (...args) => {
    if (
      args.every((arg, index) => arg === lastArgs[index])
    ) {
      return lastReturn;
    }
    lastArgs = args;
    lastReturn = fn(...args);
    return lastReturn;
  };
};
