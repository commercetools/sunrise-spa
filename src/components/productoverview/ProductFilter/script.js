import { modifyQuery } from '../../common/shared';

/* eslint-disable no-prototype-builtins */
export default {
  props: ['facets'],
  data: () => ({
  }),
  computed: {
  },
  methods: {
    filerChange(e, name) {
      const query = modifyQuery(
        name,
        e.target.value,
        this.$route.query,
        e.target.checked,
      );
      this.$router.push({
        ...this.$route,
        query,
      });
    },
    isChecked(name, value) {
      return Array.isArray(this.$route.query[name])
        ? this.$route.query[name].includes(value)
        : this.$route.query[name] === value;
    },
  },
};
