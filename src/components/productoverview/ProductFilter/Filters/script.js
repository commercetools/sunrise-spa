/* eslint-disable no-prototype-builtins */
import Standard from './Standard/index.vue';
import Colors from './Colors/index.vue';
import Designer from './Designer/index.vue';

export default {
  props: ['name', 'label', 'terms', 'component'],
  components: {
    Standard,
    Colors,
    Designer,
  },
  methods: {
    filterChange(e) {
      this.$emit('changed', e);
    },
  },
};
