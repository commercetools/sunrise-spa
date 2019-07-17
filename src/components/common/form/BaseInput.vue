<template>
  <span class="form-field">
    <BaseLabel v-if="label"
               :vuelidate="vuelidate"
               :label="label"
               :type="$attrs.type">
      <input v-model="model"
             v-bind="$attrs"
             :class="errorClass"/>
    </BaseLabel>
    <input v-else
           v-model="model"
           v-bind="$attrs"
           :class="errorClass"/>
    <ValidationError v-if="vuelidate"
                     :vuelidate="vuelidate"
                     :customErrors="customErrors"/>
  </span>
</template>

<script>
import ValidationError from './ValidationError.vue';
import BaseLabel from './BaseLabel.vue';

export default {
  inheritAttrs: false,

  components: {
    BaseLabel,
    ValidationError,
  },

  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    vuelidate: {
      type: Object,
    },
    label: {
      type: String,
    },
    customErrors: {
      type: Object,
    },
  },

  computed: {
    errorClass() {
      return { error: this.vuelidate?.$error };
    },

    model: {
      get() {
        return this.value;
      },
      set(value) {
        if (this.vuelidate) this.vuelidate.$touch();
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped>
.form-field {
  width: 100%;
  position: relative;
  display: inline-block;
}

input {
  width: 100%;
  border: 1px solid #D6D6D6;
  border-radius: 1px;
  padding: 0.5em;
  margin-top: 0.2em;
}

.error {
  border-color: rgba(206, 65, 65, 0.6);
}
</style>
