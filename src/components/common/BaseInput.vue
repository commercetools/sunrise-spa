<template>
  <div class="form-field">
    <label v-if="label"
           class="field-label text-uppercase">
      {{ label }}
      <span v-if="required"
            :title="$t('required')"
            class="field-required">
        *
      </span>
      <input v-model="model"
             v-bind="$attrs"
             :class="{ 'error': vuelidate.$error }"/>
    </label>
    <ValidationError :vuelidate="vuelidate"
                     :customErrors="customErrors"/>
  </div>
</template>

<script>
import ValidationError from './ValidationError.vue';

export default {
  inheritAttrs: false,

  components: {
    ValidationError,
  },

  props: {
    value: {
      type: [String, Number, Boolean],
    },
    vuelidate: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
    },
    customErrors: {
      type: Object,
    },
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.vuelidate.$touch();
        this.$emit('input', value);
      },
    },

    required() {
      return this.vuelidate.$params.required;
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  padding-top: 15px;
}

.error {
  border-color: rgba(206, 65, 65, 0.6);
}

.field-required {
  color: #D54D4D;
  cursor: default;
}
</style>

<i18n>
en:
  required: "Required field"
de:
  required: "Pflichtfeld"
</i18n>
