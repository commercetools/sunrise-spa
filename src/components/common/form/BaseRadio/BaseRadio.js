export default {
  inheritAttrs: false,
  props: {
    value: String,
    modelValue: {
      default: '',
    },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue === this.value;
    },
  },
  methods: {
    updateInput() {
      this.$emit('change', this.value);
    },
  },
};
