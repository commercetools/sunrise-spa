export default {
  ct: {
    auth: {
      host: process.env.VUE_APP_CT_AUTH_HOST || 'https://auth.sphere.io',
      projectKey: process.env.VUE_APP_CT_PROJECT_KEY || 'fashion-demo',
      credentials: {
        clientId: process.env.VUE_APP_CT_CLIENT_ID || 'VkveKkg-XxgroDXQchHvC8cu',
        clientSecret: process.env.VUE_APP_CT_CLIENT_SECRET || 'CushXwkuDP17_ux4kMidsNMTJgOmRu4E',
      },
      scopes: [process.env.VUE_APP_CT_SCOPE || 'manage_my_profile:fashion-demo create_anonymous_token:fashion-demo'
      + ' manage_my_payments:fashion-demo view_products:sunrise-spa manage_my_orders:fashion-demo'
      + ' manage_my_shopping_lists:fashion-demo'],
    },
    api: process.env.VUE_APP_CT_API_HOST || 'https://api.sphere.io',
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
};
