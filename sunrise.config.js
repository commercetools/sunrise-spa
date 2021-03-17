// eslint-disable-next-line no-console
console.log("using host:", process.env.VUE_APP_CT_API_HOST);

export default {
    ct: {
        auth: {
            host:
                process.env.VUE_APP_CT_AUTH_HOST ||
                "https://auth.us-central1.gcp.commercetools.com",
            projectKey:
                process.env.VUE_APP_CT_PROJECT_KEY || "photon-learning",
            credentials: {
                clientId:
                    process.env.VUE_APP_CT_CLIENT_ID ||
                    "QKE1n_hvGjwMAMw88Iv3XyxK",
                clientSecret:
                    process.env.VUE_APP_CT_CLIENT_SECRET ||
                    "bNOWIy7H6jZOHi7xNE5teKqr4RkCOi0m",
            },
            scopes: [
                process.env.VUE_APP_CT_SCOPE || "manage_project:photon-learning",
            ],
        },
        api:
            process.env.VUE_APP_CT_API_HOST ||
            "https://api.us-central1.gcp.commercetools.com",
    },
    languages: {
        en: "English",
        id: "Indonesia"
    },
    countries: {
        US: "United States",
        ID: "Indonesia"
    },
    formats: {
        number: {
            US: {
                currency: {
                    style: "currency",
                    currency: "USD",
                },
            },
            IDR: {
                currency: {
                    style: "currency",
                    currency: "IDR",
                },
            },
        },
        datetime: {
            ID: {
                short: {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                },
            },
            US: {
                short: {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                },
            },
        },
    },
    categories: {
        salesExternalId: "8",
    },
    facetSearches: [
        {
            name: "size",
            type: "text",
            label: {
                it: "Size",
                en: "Size",
            },
        },
        {
            name: "color",
            type: "enum",
            component: "color",
            label: {    
                it: "Color",
                en: "Color",
            },
        },
        {
            name: "choosegender",
            type: "enum",
            component: "choosegender",
            label: {
                it: "Jenis Kelamin",
                en: "Gender",
            },
        },
    ],
    detailAttributes: [
        "color",
        "designer",
        "colorFreeDefinition",
        "brand",
        "choosegender",
        "articleNumberManufacturer",
        "productDescription"
    ],
    variantSelector: ["color", "testsize"],
    variantInProductName: ["testsize"],
};