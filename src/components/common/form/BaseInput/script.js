import BaseLabel from '../BaseLabel/index.vue';

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
