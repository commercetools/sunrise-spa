<style src="./style.css" scoped></style>
<i18n src="./ValidationError.txt"></i18n>
<script src="./ValidationError.js"></script>

<template>
  <span v-if="vuelidate.$error"
        data-test="validation-error-list">
    <span v-for="validation in validations"
          :key="validation">
      <span v-if="!vuelidate[validation]"
            :validation="validation"
            data-test="validation-error">
        <span class="message">
          {{ getErrorMessage(validation) }}
        </span>
      </span>
    </span>
  </span>

</template>
