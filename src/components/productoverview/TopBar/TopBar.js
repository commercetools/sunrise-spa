/* eslint-disable no-param-reassign */

import HoverDropdown from '../../common/HoverDropdown/HoverDropdown.vue';

export default {
  props: ['show', 'sort', 'offset', 'count', 'total'],
  components: {
    HoverDropdown,
  },
  data() {
    return {
      sortItems: [{ id: null, name: this.$t('recommended') },
        { id: 'newest', name: this.$t('newest') },
      ],
    };
  },
  computed: {
  },
  methods: {
    toggleFilter(e) {
      this.$emit('toggle-filter', e);
    },
    changeSort(sort) {
      this.$emit('change-sort', sort);
    },
  },
  watch: {
  },
};
