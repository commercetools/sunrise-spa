import SelectBoxIt from '../SelectBoxIt/SelectBoxIt.vue';
import BaseLabel from '../BaseLabel/BaseLabel.vue';

export default {
  inheritAttrs: false,
  components: {
    BaseLabel,
    SelectBoxIt,
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    vuelidate: Object,
    options: {
      type: Array,
      required: true,
    },
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
        this.vuelidate.$touch();
        this.$emit('input', value);
      },
    },
  },
};
