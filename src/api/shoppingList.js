/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import {
  withToken,
  groupFetchJsonCacheSession as groupFetchJson,
  makeConfig,
  baseUrl,
} from "./api";
// import config from "../../sunrise.config";
// import { locale } from "../components/common/shared";

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
};

export default shoppingList;
