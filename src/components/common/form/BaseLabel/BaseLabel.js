import ValidationError from '../ValidationError/ValidationError.vue';

export default {
  components: { ValidationError },
  props: {
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
    required() {
      return this.vuelidate?.$params?.required;
    },
  },
};
