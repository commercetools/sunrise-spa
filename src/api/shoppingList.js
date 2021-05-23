/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import {
  withToken,
  groupApi,
  fetchJson,
  makeConfig,
  baseUrl,
} from "./api";
// import config from "../../sunrise.config";
// import { locale } from "../components/common/shared";
const cache = new Map();
const groupFetchJson = groupApi(fetchJson,cache);
const resetCache = ()=>cache.clear();
const shoppingList = {
  get: withToken((accessToken) => {
    return groupFetchJson(
      new URL(`${baseUrl}/me/shopping-lists`),
      makeConfig(accessToken)
    ).then((response) => response.results?.[0]);
  }),
  create: withToken((accessToken) => {
    return groupFetchJson(
      new URL(`${baseUrl}/me/shopping-lists`),
      {
        method: "POST",
        body: JSON.stringify({
          name: {
            en: "my shopping list",
          },
        }),
        ...makeConfig(accessToken),
      }
    );
  }),
  addItem: withToken(
    ([productId, listId, version], accessToken) => {
      return groupFetchJson(
        new URL(`${baseUrl}/me/shopping-lists/${listId}`),
        {
          method: "POST",
          body: JSON.stringify({
            version,
            actions: [
              {
                action: "addLineItem",
                productId
              },
            ],
          }),
          ...makeConfig(accessToken),
        }
      );
    }
  ),
  removeItem: withToken(
    ([lineItemId, listId, version], accessToken) => {
      return groupFetchJson(
        new URL(`${baseUrl}/me/shopping-lists/${listId}`),
        {
          method: "POST",
          body: JSON.stringify({
            version,
            actions: [
              {
                action: "removeLineItem",
                lineItemId,
              },
            ],
          }),
          ...makeConfig(accessToken),
        }
      );
    }
  ),
  resetCache
};

export default shoppingList;
