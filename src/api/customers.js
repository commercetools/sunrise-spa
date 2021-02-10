/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import {
  withToken,
  fetchJson,
  makeConfig,
  baseUrl,
} from "./api";

const customers = {
  createToken: withToken(({email,ttlMinutes=10}, accessToken) =>
    fetchJson(`${baseUrl}/customers/password-token`, {
      ...makeConfig(accessToken),
      method: "POST",
      body: JSON.stringify({email,ttlMinutes}),
    })
  ),
  resetPassword: withToken(({ tokenValue,newPassword }, accessToken) => {
    const url = new URL(`${baseUrl}/customers/password/reset`);
    fetchJson(url, {
      ...makeConfig(accessToken),
      method: "POST",
      body:JSON.stringify({tokenValue,newPassword}),
    });
  }),
};

export default customers;
