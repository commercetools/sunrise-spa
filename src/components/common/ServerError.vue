<template>
  <div v-if="error"
       class="error">
    <span v-if="isGraphQLError">
      <slot v-for="graphQLError in graphQLErrors"
            :graphQLError="graphQLError">
        {{ $t('unknownError') }}
      </slot>
    </span>
    <span v-else-if="isNetworkError">{{ $t('networkError') }}</span>
    <span v-else>{{ $t('unknownError') }}</span>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Error,
    },
  },

  computed: {
    isNetworkError() {
      return this.error && this.error.networkError;
    },

    isGraphQLError() {
      return this.error && Array.isArray(this.error.graphQLErrors) && this.error.graphQLErrors.length;
    },

    graphQLErrors() {
      return this.isGraphQLError ? this.error.graphQLErrors : [];
    },
  },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "networkError": "There was a error in the connection, please try again later"
  },
  "de": {
    "networkError": "Bei der Verbindung ist ein Fehler aufgetreten, versuchen Sie es bitte später nochmals"
  }
}
</i18n>