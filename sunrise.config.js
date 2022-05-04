const getEnv = (env) => {
  return typeof global?.Cypress?.env === 'function'
    ? global.Cypress.env(env)
    : process.env[env];
};
let localConfig = {};
if (getEnv('VUE_APP_LOCAL_SUNRISE_CONFIG')) {
  localConfig = require(process.env
    .VUE_APP_LOCAL_SUNRISE_CONFIG).default;
}
const config = {
  ct: {
    auth: {
      host:
        getEnv('VUE_APP_CT_AUTH_HOST') ||
        'https://auth.europe-west1.gcp.commercetools.com',
      projectKey:
        getEnv('VUE_APP_CT_PROJECT_KEY') || 'sunrise-spa',
      credentials: {
        clientId:
          getEnv('VUE_APP_CT_CLIENT_ID') ||
          '1mnlpBq-fHCCkAzmSXxNBB37',
        clientSecret:
          getEnv('VUE_APP_CT_CLIENT_SECRET') ||
          'WS9hXm6dKyqyuLOHciL6jkbCbFHrDSOL',
      },
      scope:
        getEnv('VUE_APP_CT_SCOPE') ||
        'manage_my_orders:sunrise-spa ' +
          'manage_my_profile:sunrise-spa ' +
          'manage_my_payments:sunrise-spa ' +
          'view_published_products:sunrise-spa ' +
          'view_categories:sunrise-spa ' +
          'manage_my_shopping_lists:sunrise-spa ' +
          'manage_orders:sunrise-spa ' +
          'create_anonymous_token:sunrise-spa',
    },
    api:
      getEnv('VUE_APP_CT_API_HOST') ||
      'https://api.europe-west1.gcp.commercetools.com',
  },
  languages: {
    'es-CL': 'Spanish',
    // de: "Deutsch",
  },
  countries: {
    CL: 'Chile',
    // US: "United States",
  },
  formats: {
    number: {
      CL: {
        currency: {
          style: 'currency',
          currency: 'CLP',
          currencyDisplay: 'symbol',
        },
      },
      // US: {
      //   currency: {
      //     style: "currency",
      //     currency: "USD",
      //   },
      // },
    },
    datetime: {
      CL: {
        short: {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      },
    },
  },
  categories: {
    salesExternalId: '6',
  },
  facetSearches: [], //vue3 version does not use facet searches
  detailAttributes: [], //what attributes to show in product detail
  // detailAttributes: [
  //   {
  //     name: 'designer',
  //     label: {
  //       it: 'Designer',
  //       de: 'Designer',
  //       en: 'Designer',
  //     },
  //   },
  // ],
  // variantSelector: ['color', 'size'],
  // If variants come in different colors then ["color"]
  //  could be variantSelector, it is the name of the
  //  attribute you can have different variants in
  variantSelector: [],
  variantInProductName: [],
  ...localConfig,
};
// eslint-disable-next-line no-console
console.log('using config:', config);
export default config;
