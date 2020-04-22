import productMixin from '@/mixins/productMixin';

export default {
  props: {
    lineItem: {
      type: Object,
      required: true,
    },
    extended: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    dump() {
      // console.log(this.lineItem);
      return 22;
    },
  },
  mixins: [productMixin],
};
