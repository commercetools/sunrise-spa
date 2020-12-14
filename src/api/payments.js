/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import {
  withToken,
  fetchJson,
  makeConfig,
  baseUrl,
} from "./api";
import { v4 as uuid } from "uuid";

const payments = {
  createItem: withToken((body, accessToken) =>
    fetchJson(`${baseUrl}/payments/`, {
      ...makeConfig(accessToken),
      method: "POST",
      body: JSON.stringify(body),
    })
  ),
  deleteItem: withToken(({ id, version }, accessToken) => {
    const url = new URL(`${baseUrl}/payments/${id}`);
    url.searchParams.append("version", version);
    url.searchParams.append("dataErasure", true);
    fetchJson(url, {
      ...makeConfig(accessToken),
      method: "DELETE",
    });
  }),
  updateItem: withToken(
    ({ id, version, amount, paymentMethod }, accessToken) =>
      fetchJson(`${baseUrl}/payments/${id}`, {
        ...makeConfig(accessToken),
        method: "POST",
        body: JSON.stringify({
          version,
          actions: [
            {
              action: "setCustomField",
              name: "makePaymentRequest",
              value: JSON.stringify({
                amount,
                reference: uuid(),
                paymentMethod,
                merchantAccount:
                  process.env
                    .VUE_APP_ADYEN_MERCHANT_ACCOUNT,
              }),
            },
            {
              action: "setStatusInterfaceCode",
              interfaceCode: "paid",
            },
          ],
        }),
      })
  ),
};

export default payments;
