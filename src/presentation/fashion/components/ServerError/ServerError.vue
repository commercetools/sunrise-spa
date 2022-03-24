<style src="./style.css" scoped></style>
<i18n src="./ServerError.txt" lang="yaml"></i18n>
<script src="./ServerError.js"></script>

<template>
  <div v-if="error" class="server-error">
    <span v-if="isGraphQLError">
      <slot
        v-for="graphQLError in graphQLErrors"
        :graphQLError="graphQLError"
      >
        {{ t('unknownError') }}
      </slot>
    </span>
    <span v-else-if="isBadRequestError">{{
      t('badRequestError')
    }}</span>
    <span v-else-if="isNetworkError">{{
      t('networkError')
    }}</span>
    <span v-else-if="is404Error">{{
      error.response.data
    }}</span>
    <span v-else>{{ t('unknownError') }}</span>
  </div>
</template>
