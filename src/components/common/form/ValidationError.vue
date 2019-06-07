<template>
  <div v-if="vuelidate.$error"
       data-test="validation-error-list">
    <div v-for="validation in validations"
         :key="validation">
      <div v-if="!vuelidate[validation]"
           :validation="validation"
           data-test="validation-error">
        <div class="form-error-bubble">
          {{ getErrorMessage(validation) }}
        </div>
      </div>
    </div>
  </div>
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

<style lang="scss" scoped>
.form-error-bubble {
  font-size: 12px;
  position: absolute;
  margin-top: -7px;
  margin-left: 1px;
  z-index: 1000;
  padding: 0;
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
