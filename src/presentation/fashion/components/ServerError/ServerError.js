import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    error: {
      type: Error,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const isNetworkError = computed(() => {
      return props.error?.networkError;
    });
    const isBadRequestError = computed(() => {
      return props.error?.networkError?.statusCode === 400;
    });
    const isGraphQLError = computed(() => {
      return (
        Array.isArray(props.error?.graphQLErrors) &&
        props.error?.graphQLErrors.length
      );
    });
    const is404Error = computed(() => {
      return props.error?.response?.status === 404;
    });
    const graphQLErrors = computed(() => {
      return isGraphQLError.value
        ? props.error.graphQLErrors
        : [];
    });
    watch(props, (props) => {
      if (props.error) {
        console.warn(props.error);
      }
    });
    return {
      isNetworkError,
      isBadRequestError,
      isGraphQLError,
      is404Error,
      graphQLErrors,
      t,
    };
  },
};
