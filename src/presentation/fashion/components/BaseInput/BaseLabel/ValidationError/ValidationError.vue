<style src="./style.css" scoped></style>
<i18n src="./ValidationError.txt" lang="yaml"></i18n>
<script src="./ValidationError.js"></script>

<template>
  <span
    v-if="vuelidate.$error"
    data-test="validation-error-list"
  >
    <span
      v-for="validation in validations"
      :key="validation"
    >
      <span
        data-test="validation-error"
        v-if="vuelidate[validation].$invalid"
      >
        <span class="message">
          {{ getErrorMessage(validation) }} </span
        >&nbsp;
      </span>
    </span>
  </span>
</template>
