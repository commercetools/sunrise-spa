import HooverDropdown from '../../common/HoverDropdown/HoverDropdown.vue';

export default {
  components: {
    HooverDropdown,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    variantCombinations: {
      type: Array,
      required: true,
    },
    selected: {
      type: Object,
      required: true,
    },
  },
  computed: {
    selectedValue() {
      return this.selected[this.name];
    },
  },
  methods: {
    setSelectedValue(id, value) {
      const sku = this.variantCombinations.find(
        combi => combi[id] === value,
      )?.sku;
      if (sku) this.$router.push({ path: sku });
    },
  },
};
