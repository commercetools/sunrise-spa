<template>
  <div v-if="error"
       class="server-error">
    <span v-if="isGraphQLError">
      <slot v-for="graphQLError in graphQLErrors"
            :graphQLError="graphQLError">
        {{ $t('unknownError') }}
      </slot>
    </span>
    <span v-else-if="isBadRequestError">{{ $t('badRequestError') }}</span>
    <span v-else-if="isNetworkError">{{ $t('networkError') }}</span>
    <span v-else-if="is404Error">{{ error.response.data }}</span>
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
      return this.error?.networkError;
    },

    isBadRequestError() {
      return this.error?.networkError?.statusCode === 400;
    },

    isGraphQLError() {
      return Array.isArray(this.error?.graphQLErrors) && this.error?.graphQLErrors.length;
    },

    is404Error() {
      return this.error?.response?.status === 404;
    },

    graphQLErrors() {
      return this.isGraphQLError ? this.error.graphQLErrors : [];
    },
  },
};
</script>

<style scoped>
  .server-error {
    color: rgb(206, 65, 65);
    font-weight: bold;
  }
</style>

<i18n>
en:
  badRequestError: "There seems to be an issue with the request"
  networkError: "There was a error in the connection, please try again later"
de:
  badRequestError: "Es gibt ein Problem mit der Anfrage"
  networkError: "Bei der Verbindung ist ein Fehler aufgetreten, versuchen Sie es bitte später nochmals"
</i18n>
