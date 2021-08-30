/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import {
  withToken,
  groupApi,
  fetchJson,
  makeConfig,
  baseUrl,
} from "./api";
const cache = new Map();
const groupFetchJson = groupApi(fetchJson,cache);
const resetCache = ()=>cache.clear();
const discountCode = {
  get: withToken(({id},accessToken) => {
    const url = new URL(`${baseUrl}/discount-codes/${id}`);
    return groupFetchJson(
      url,
      makeConfig(accessToken)
    );
  }),
  resetCache
};

export default discountCode;
