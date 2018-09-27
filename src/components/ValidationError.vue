<template>
<div :class="vuelidate.$error ? 'form-error': ''">
  <slot></slot>
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
</div>
</template>

<script>
export default {
  props: {
    vuelidate: {
      type: Object,
      required: true,
    },
    customMessages: {
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
      const customMessage = this.customMessages[validation];
      if (customMessage) {
        return customMessage;
      }
      const { type, ...args } = this.vuelidate.$params[validation];
      return this.$te(type) ? this.$t(type, args) : this.$t('unknownValidation');
    },
  },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "unknownValidation": "Invalid field",
    "required": "Required field",
    "email": "A valid email is required",
    "minLength": "It should contain at least {min} characters"
  },
  "de": {
    "unknownValidation": "Ungültiger Feldwert",
    "required": "Pflichtfeld",
    "email": "Eine gültige E-Mail ist erforderlich",
    "minLength": "Es sollte mindestens {min} Zeichen enthalten"
  }
}
</i18n>

<style lang="scss" scoped>
.form-error-bubble {
  position: absolute;
  z-index: 1000;
  padding: 5px;
  margin-top: 6px;
  background: rgb(250, 226, 226);
  border: 0px solid rgba(136, 136, 136, 0.747);
  border-radius: 4px;
  color: rgb(114, 36, 36);
  box-shadow: 1px 1px 1px rgb(153, 153, 153);
}

.form-error-bubble:after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: rgb(250, 226, 226);
  border-top: 0;
  margin-left: -20px;
  margin-top: -6px;
}

.form-error input:not([type=checkbox]) {
  border: 1px solid rgba(206, 65, 65, 0.651);;
} 
</style>
