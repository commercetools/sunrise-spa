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
    fr: 'French',
    en: 'English',
    de: 'Deutsch',
  },
  countries: {
    FR: 'France',
    DE: 'Deutschland',
    US: 'United States',
  },
  formats: {
    number: {
      FR: {
        currency: {
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'symbol',
        },
      },
      DE: {
        currency: {
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'symbol',
        },
      },
      US: {
        currency: {
          style: 'currency',
          currency: 'USD',
        },
      },
    },
    datetime: {
      US: {
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
      DE: {
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
  facetSearches: [
    {
      name: 'size',
      type: 'text',
      label: {
        fr: 'Taille',
        it: 'Size',
        de: 'Größe',
        en: 'Size',
      },
    },
    {
      name: 'color',
      type: 'lnum',
      component: 'colors',
      label: {
        fr: 'Couleur',
        de: 'Farbe',
        it: 'Color',
        en: 'Color',
      },
    },
    {
      name: 'designer',
      type: 'enum',
      component: 'designer',
      label: {
        fr: 'Designer',
        it: 'Designer',
        de: 'Designer',
        en: 'Designer',
      },
    },
  ],
  detailAttributes: [
    {
      name: 'designer',
      label: {
        fr: 'Designer',
        it: 'Designer',
        de: 'Designer',
        en: 'Designer',
      },
    },
    {
      name: 'colorFreeDefinition',
      label: {
        fr: 'Couleur',
        it: 'Color',
        de: 'Farbe',
        en: 'Color',
      },
    },
    {
      name: 'size',
      label: {
        fr: 'Taille',
        it: 'Size',
        de: 'Grösse',
        en: 'Size',
      },
    },
    {
      name: 'style',
      label: {
        fr: 'Style',
        it: 'Style',
        de: 'Stil',
        en: 'Style',
      },
    },
    {
      name: 'gender',
      label: {
        fr: 'Genre',
        it: 'Gender',
        de: 'Zielgruppe',
        en: 'Gender',
      },
    },
    {
      name: 'articleNumberManufacturer',
      label: {
        fr: 'AID fabriquant',
        it: 'Manufacturer AID',
        de: 'Herstellernummer',
        en: 'Manufacturer AID',
      },
    },
  ],
  variantSelector: ['color', 'size'],
  variantInProductName: ['size'],
  ...localConfig,
};
// eslint-disable-next-line no-console
console.log('using config:', config);
export default config;
