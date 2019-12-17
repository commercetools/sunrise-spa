<template>
  <BaseLabel :vuelidate="vuelidate"
             :label="label"
             :customErrors="customErrors">
    <input v-model="model"
           v-bind="$attrs"
           :class="errorClass"/>
  </BaseLabel>
</template>

<script>
import BaseLabel from './BaseLabel.vue';

export default {
  inheritAttrs: false,

  components: { BaseLabel },

  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    vuelidate: Object,
    label: String,
    customErrors: Object,
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
  input {
    width: 100%;
    border: 1px solid #D6D6D6;
    border-radius: 1px;
    padding: 0.5em;
    margin-top: 0.2em;
  }

  input[type=checkbox] {
    float: left;
    width: auto;
    margin-top: 0.3em;
    margin-right: 10px;
  }

  .error {
    border-color: rgba(206, 65, 65, 0.6);
  }
</style>
