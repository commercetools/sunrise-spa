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

<script>
export default {
  props: {
    vuelidate: {
      type: Object,
      required: true,
    },
    customErrors: {
      type: Object,
      default() { return {}; },
    },
  },

  computed: {
    validations() {
      return Object.keys(this.vuelidate.$params);
    },
  },

  methods: {
    getErrorMessage(validation) {
      const customError = this.customErrors[validation];
      if (customError) {
        return customError;
      }
      const { type, ...args } = this.vuelidate.$params[validation];
      return this.$te(type) ? this.$t(type, args) : this.$t('unknownValidation');
    },
  },
};
</script>

<style scoped>
.message {
  font-size: 12px;
  color: rgb(206, 65, 65);
}
</style>

<i18n>
en:
  unknownValidation: "Invalid field"
  required: "Required field"
  email: "A valid email is required"
  minLength: "It should contain at least {min} characters"
de:
  unknownValidation: "Ungültiger Feldwert"
  required: "Pflichtfeld"
  email: "Eine gültige E-Mail ist erforderlich"
  minLength: "Es sollte mindestens {min} Zeichen enthalten"
</i18n>
