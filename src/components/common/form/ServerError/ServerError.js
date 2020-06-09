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
