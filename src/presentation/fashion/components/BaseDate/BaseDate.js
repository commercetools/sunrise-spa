import { useI18n } from 'vue-i18n';
import useLocation from 'hooks/useLocation';
import { computed } from 'vue';

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { d } = useI18n();
    const { location } = useLocation();
    const formattedDate = computed(() => {
      return d(
        new Date(props.date),
        props.format,
        location.value
      );
    });
    return { formattedDate };
  },
};
