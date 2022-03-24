import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { DEFAULT_PAGE_SIZE } from '../../../../constants';

export default {
  props: {
    pageSize: {
      type: Number,
      default: DEFAULT_PAGE_SIZE,
    },
    total: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    setPage: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    const totalPages = computed(() => {
      return Math.ceil(props.total / props.pageSize);
    });
    const isInFirstPage = computed(() => {
      return props.page === 1;
    });
    const isInLastPage = computed(() => {
      return props.page > totalPages.value - 1;
    });
    const pages = computed(() => {
      const last = Math.ceil(props.page / 3) * 3;
      const total = totalPages.value;
      return [last - 2, last - 1, last].filter(
        (page) => page <= total
      );
    });
    const show = computed(() => {
      return totalPages.value > 1;
    });

    const nextPage = () => {
      props.setPage(props.page + 1);
    };
    const previousPage = () => {
      props.setPage(props.page - 1);
    };
    const goToPage = (page) => {
      props.setPage(page);
    };
    const isCurrentPage = (page) => {
      return page === props.page;
    };

    return {
      t,
      totalPages,
      isInFirstPage,
      isInLastPage,
      nextPage,
      previousPage,
      goToPage,
      isCurrentPage,
      pages,
      show,
    };
  },
};
