/* eslint-disable import/prefer-default-export */
export { default as products } from './products';
export const onlyLastRequestedPromise = ((promiseIds) => {
  const whenResolve = (promise, id, promiseID, resolveValue) => {
    if (promise !== undefined) {
      // called by user adding a promise
      // eslint-disable-next-line no-param-reassign
      promiseIds[id] = {};
    } else {
      // called because promise is resolved
      return promiseID === promiseIds[id]
        ? Promise.resolve(resolveValue)
        // eslint-disable-next-line prefer-promise-reject-errors
        : Promise.reject('A newer request was made.');
    }
    return (function last(currentPromiseID) {
      return promise.then(result => whenResolve(undefined, id, currentPromiseID, result));
    }(promiseIds[id]));
  };
  return (id = 'general') => promise => whenResolve(promise, id);
})({});
