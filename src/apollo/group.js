//group promise returning function
export const createGroup =
  (cache) =>
  (fn, getKey = (...x) => JSON.stringify(x)) =>
  (...args) => {
    const key = getKey(args);
    let result = cache.get(key);
    if (result) {
      return result;
    }
    //no cache
    result = Promise.resolve(fn.apply(null, args)).then(
      (r) => {
        cache.resolved(key); //tell cache promise is done
        return r;
      },
      (e) => {
        cache.resolved(key); //tell cache promise is done
        return Promise.reject(e);
      }
    );
    cache.set(key, result);
    return result;
  };
export const createPromiseSessionCache = (
  cache = new Map()
) => {
  return {
    get: (key) => cache.get(key),
    set: (key, value) => cache.set(key, value),
    resolved: (key) => cache.delete(key),
  };
};
