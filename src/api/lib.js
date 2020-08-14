/* eslint-disable import/prefer-default-export */
export const group = (fn, groups = new Map(), cache = true,
  getKey = (args) => JSON.stringify(args)) => (...args) => {
  const key = getKey(args);
  const existing = groups.get(key);
  if (existing) {
    return existing;
  }
  const result = fn(...args);
  result.then(
    () => !cache && groups.delete(key),
    () => !cache && groups.delete(key),
  );
  groups.set(key, result);
  return result;
};
