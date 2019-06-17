<template>
  <span class="form-field">
    <BaseLabel v-if="label"
               :vuelidate="vuelidate"
               :label="label">
      <input v-model="model"
             v-bind="$attrs"
             :class="{ 'error': vuelidate.$error }"/>
    </BaseLabel>
    <input v-else
           v-model="model"
           v-bind="$attrs"
           :class="{ 'error': vuelidate.$error }"/>
    <ValidationError :vuelidate="vuelidate"
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
  },
};
</script>

<style scoped>
.form-field {
  width: 100%;
}

.error {
  border-color: rgba(206, 65, 65, 0.6);
}
</style>
