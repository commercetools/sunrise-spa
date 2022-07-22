// eslint-disable-next-line no-console
let localConfig = {};
if (process.env.VUE_APP_LOCAL_SUNRISE_CONFIG) {
  localConfig = require(process.env
    .VUE_APP_LOCAL_SUNRISE_CONFIG).default;
}

const config = {
  ct: {
    auth: {
      host: "https://api.europe-west1.gcp.commercetools.com",
      projectKey: "sunrise-spa",
      credentials: {
        clientId: "dX-gnzl-razMgFca7TZHdaHs",
        clientSecret: "noTN9jQWanauFLfs4iP4aJ_Qa_Ob9O-B",
      },
      scopes: [
        "manage_my_orders:sunrise-spa " +
          "manage_my_profile:sunrise-spa " +
          "manage_my_business_units:sunrise-spa " +
          "manage_my_payments:sunrise-spa " +
          "view_products:sunrise-spa " +
          "view_published_products:sunrise-spa " +
          "manage_my_quotes:sunrise-spa " +
          "manage_my_quote_requests:sunrise-spa " +
          "view_categories:sunrise-spa " +
          "manage_orders:sunrise-spa " +
          "create_anonymous_token:sunrise-spa " +
          "manage_my_shopping_lists:sunrise-spa " +
          "manage_customers:sunrise-spa",
      ],
    },
    api:
      process.env.VUE_APP_CT_API_HOST ||
      "https://api.europe-west1.gcp.commercetools.com",
  },
  languages: {
    en: "English",
    de: "Deutsch",
  },
  countries: {
    DE: "Deutschland",
    US: "United States",
  },
  formats: {
    number: {
      DE: {
        currency: {
          style: "currency",
          currency: "EUR",
          currencyDisplay: "symbol",
        },
      },
      US: {
        currency: {
          style: "currency",
          currency: "USD",
        },
      },
    },
    datetime: {
      US: {
        short: {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      },
      DE: {
        short: {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      },
    },
  },
  categories: {
    salesExternalId: "6",
  },
  facetSearches: [
    {
      name: "size",
      type: "text",
      label: {
        it: "Size",
        de: "Größe",
        en: "Size",
      },
    },
    {
      name: "color",
      type: "lnum",
      component: "colors",
      label: {
        de: "Farbe",
        it: "Color",
        en: "Color",
      },
    },
    {
      name: "designer",
      type: "enum",
      component: "designer",
      label: {
        it: "Designer",
        de: "Designer",
        en: "Designer",
      },
    },
  ],
  detailAttributes: [
    {
      name: "designer",
      label: {
        it: "Designer",
        de: "Designer",
        en: "Designer",
      },
    },
    {
      name: "colorFreeDefinition",
      label: {
        it: "Color",
        de: "Farbe",
        en: "Color",
      },
    },
    {
      name: "size",
      label: {
        it: "Size",
        de: "Grösse",
        en: "Size",
      },
    },
    {
      name: "style",
      label: {
        it: "Style",
        de: "Stil",
        en: "Style",
      },
    },
    {
      name: "gender",
      label: {
        it: "Gender",
        de: "Zielgruppe",
        en: "Gender",
      },
    },
    {
      name: "articleNumberManufacturer",
      label: {
        it: "Manufacturer AID",
        de: "Herstellernummer",
        en: "Manufacturer AID",
      },
    },
  ],
  variantSelector: ["color", "size"],
  variantInProductName: ["size"],
  ...localConfig,
};
console.log("using config:", config);
export default config;
