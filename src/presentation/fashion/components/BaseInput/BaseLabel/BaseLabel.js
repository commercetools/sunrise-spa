import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ValidationError from './ValidationError/ValidationError.vue';
import localMessages from './BaseLabel.json'

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
  setup(props) {
    const { t } = useI18n({messages: localMessages});
    const required = computed(
      () => props.vuelidate?.required
    );
    return { t, required };
  },
};
