/* eslint-disable import/prefer-default-export */

export const randomCustomer = () => ({
  firstName: 'Charlie',
  lastName: 'Bucket',
  email: `charlie.bucket.${Cypress.moment().format('YYYYMMDDHHmmssSS')}@commercetools.com`,
  password: 'p@ssword',
});
