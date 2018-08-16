<template>
  <div>
    <div v-for="graphQLError in graphQLErrors"
         :key="graphQLError.code"
         data-test="server-error-graphql"
         class="error">
      {{ translateErrorMessage(graphQLError) }}
    </div>
    <div v-if="hasNetworkError"
         class="error">
      {{ $t('networkError') }}
    </div>
  </div>
</template>

<script>
import { ApolloError } from 'apollo-client';

export default {
  name: 'ServerError',

  props: {
    error: {
      type: ApolloError,
    },
  },

  computed: {
    hasNetworkError() {
      return this.error && this.error.networkError;
    },

    hasGraphQLErrors() {
      return this.error && Array.isArray(this.error.graphQLErrors) && this.error.graphQLErrors.length > 0;
    },

    graphQLErrors() {
      return this.hasGraphQLErrors ? this.error.graphQLErrors : [];
    },
  },

  methods: {
    translateErrorMessage(error) {
      const key = `errorCodes.${error.code}`;
      const hasTranslation = error.code && this.$te(key);
      return hasTranslation ? this.$t(key) : this.$t('unknownError');
    },
  },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "errorCodes": {
      "InvalidCredentials": "Invalid credentials"
    },
    "networkError": "There was a error in the connection, please try again later",
    "unknownError": "Something went wrong"
  },
  "de": {
    "errorCodes": {
      "InvalidCredentials": "Ungültige Anmeldeinformationen"
    },
    "networkError": "Bei der Verbindung ist ein Fehler aufgetreten, versuchen Sie es bitte später nochmals",
    "unknownError": "Etwas ist schief gelaufen"
  }
}
</i18n>