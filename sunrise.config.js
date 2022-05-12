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
    en: 'English',
    'fr-Fr': 'French',
    es: 'Spanish',
  },
  countries: {
    ES: 'España',
    FR: 'Francia',
  },
  formats: {
    number: {
      ES: {
        currency: {
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'symbol',
        },
      },
      FR: {
        currency: {
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'symbol',
        },
      },
    },
    datetime: {
      ES: {
        short: {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      },
      FR: {
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
  //facet search not used in vue3
  facetSearches: [],
  //what attributes to sow in product detail
  detailAttributes: [
    // {
    //   name: 'designer',
    //   label: {
    //     it: 'Designer',
    //     de: 'Designer',
    //     en: 'Designer',
    //   },
    // },
  ],
  //what variants can be selected in product detail
  variantSelector: [], //['color', 'size'],
  //what attribute will be shown in product name on cart and order
  //  if user orders the same product in L and XL then sow it as
  //  "shirt L", "shirt XL" instead of just "shirt"
  variantInProductName: [], //['size'],
  ...localConfig,
};
// eslint-disable-next-line no-console
console.log('using config:', config);
export default config;
