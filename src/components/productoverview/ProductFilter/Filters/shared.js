export default {
  props: ['name', 'terms'],
  methods: {
    isChecked(name, value) {
      return Array.isArray(this.$route.query[name])
        ? this.$route.query[name].includes(value)
        : this.$route.query[name] === value;
    },
    filterChange(e, name) {
      this.$emit('changed', {
        name, value: e.target.value, checked: e.target.checked,
      });
    },

  },
};
