import { computed } from 'vue';
import BaseLabel from './BaseLabel/BaseLabel.vue';

export default {
  inheritAttrs: false,
  components: { BaseLabel },
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: null,
    },
    vuelidate: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    customErrors: Object,
  },
  setup(props, { emit, attrs }) {
    const value = computed(() =>
      attrs.type === 'checkbox' ? null : props.modelValue
    );
    const checked = computed(() =>
      attrs.type === 'checkbox' ? props.modelValue : null
    );
    const updateValue = (e) => {
      emit(
        'update:modelValue',
        attrs.type === 'checkbox'
          ? e.target.checked
          : e.target.value
      );
    };
    const errorClass = computed(() => {
      return { error: props.vuelidate?.$error };
    });

    return { updateValue, value, checked, errorClass };
  },
};
