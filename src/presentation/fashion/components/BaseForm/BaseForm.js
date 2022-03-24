import { shallowRef } from 'vue';

export default {
  props: {
    vuelidate: {
      type: Object,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const state = shallowRef(null);
    const error = shallowRef(null);
    function submit() {
      props.vuelidate.$touch();
      error.value = null;
      if (!props.vuelidate.$invalid) {
        state.value = 'loading';
        return props
          .onSubmit()
          .then(() => {
            state.value = 'success';
          })
          .catch((e) => {
            error.value = e;
            state.value = null;
          });
      }
    }
    return { state, error, submit };
  },
};
