export default {
  ct: {
    auth: {
      host: process.env.VUE_APP_CT_AUTH_HOST || 'https://auth.sphere.io',
      projectKey: process.env.VUE_APP_CT_PROJECT_KEY || 'sunrise-spa',
      credentials: {
        clientId: process.env.VUE_APP_CT_CLIENT_ID || 'jFVHj0-tO-THQt9evnGTJ2fD',
        clientSecret: process.env.VUE_APP_CT_CLIENT_SECRET || 'eUQgmtanysDpYxlOePOhcFklrwa5X8Sj',
      },
      scopes: [process.env.VUE_APP_CT_SCOPE || 'manage_my_profile:sunrise-spa create_anonymous_token:sunrise-spa'
      + ' manage_my_payments:sunrise-spa view_products:sunrise-spa manage_my_orders:sunrise-spa'
      + ' manage_my_shopping_lists:sunrise-spa'],
    },
    api: process.env.VUE_APP_CT_API_HOST || 'https://api.sphere.io',
  },
  languages: {
    en: 'English',
    de: 'Deutsch',
  },
  categories: {
    salesExternalId: '6',
  },
};
