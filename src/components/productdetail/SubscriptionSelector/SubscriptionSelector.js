export default {
  props: {
    subscription: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    subscribe: 0,
    frequency: 14,
  }),
};