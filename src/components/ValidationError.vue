<template>
  <div v-if="vuelidate.$error"
       class="error">
    <div v-for="validation in validations"
         :key="validation">
      <div v-if="!vuelidate[validation]"
           :validation="validation"
           data-test="validation-error">
            <span class="validation-error">
              {{ getErrorMessage(validation) }}
            </span>
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

span.validation-error{ 
  position: absolute;
  background-color: rgb(243, 119, 119);  
  z-index: 1000;
  padding: 5px;
  border-radius: 5px;
  text-transform: capitalize;
  color: rgb(87, 31, 31);
  box-shadow: 1px 1px 1px rgb(153, 153, 153);
}
</style>
