const getEnv = (env) => {
  return typeof global?.Cypress?.env === 'function'
    ? global?.Cypress?.env(env)
    : process.env[env];
};

const VUE_APP_CTP_PROJECT_KEY = getEnv('VUE_APP_CTP_PROJECT_KEY') || 'sunrise-spa'

let localConfig = {};

if (getEnv('VUE_APP_LOCAL_SUNRISE_CONFIG')) {
  localConfig = require(process.env
    .VUE_APP_LOCAL_SUNRISE_CONFIG).default;
}

const config = {
  ct: {
    auth: {
      host:
        getEnv('VUE_APP_CTP_AUTH_URL') ||
        'https://auth.europe-west1.gcp.commercetools.com',
      projectKey:
         VUE_APP_CTP_PROJECT_KEY,
      credentials: {
        clientId:
          getEnv('VUE_APP_CTP_CLIENT_ID') ||
          '1mnlpBq-fHCCkAzmSXxNBB37',
        clientSecret:
          getEnv('VUE_APP_CTP_CLIENT_SECRET') ||
          'WS9hXm6dKyqyuLOHciL6jkbCbFHrDSOL',
      },
      scope:
        getEnv('VUE_APP_CTP_SCOPES') ||
        `manage_my_orders:${VUE_APP_CTP_PROJECT_KEY} ` +
          `manage_my_profile:${VUE_APP_CTP_PROJECT_KEY} ` +
          `manage_my_payments:${VUE_APP_CTP_PROJECT_KEY} ` +
          `view_published_products:${VUE_APP_CTP_PROJECT_KEY} ` +
          `view_categories:${VUE_APP_CTP_PROJECT_KEY} ` +
          `manage_my_shopping_lists:${VUE_APP_CTP_PROJECT_KEY} ` +
          `manage_orders:${VUE_APP_CTP_PROJECT_KEY} ` +
          `create_anonymous_token:${VUE_APP_CTP_PROJECT_KEY}`,
    },
    api:
      getEnv('VUE_APP_CTP_API_URL') ||
      'https://api.europe-west1.gcp.commercetools.com',
  },
  languages: {
    en: 'English',
    de: 'Deutsch',
  },
  countries: {
    DE: 'Deutschland',
    US: 'United States',
  },
  formats: {
    number: {
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
        it: 'Designer',
        de: 'Designer',
        en: 'Designer',
      },
    },
    {
      name: 'colorFreeDefinition',
      label: {
        it: 'Color',
        de: 'Farbe',
        en: 'Color',
      },
    },
    {
      name: 'size',
      label: {
        it: 'Size',
        de: 'Grösse',
        en: 'Size',
      },
    },
    {
      name: 'style',
      label: {
        it: 'Style',
        de: 'Stil',
        en: 'Style',
      },
    },
    {
      name: 'gender',
      label: {
        it: 'Gender',
        de: 'Zielgruppe',
        en: 'Gender',
      },
    },
    {
      name: 'articleNumberManufacturer',
      label: {
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
console.log('Used config: ', config);

export default config;
