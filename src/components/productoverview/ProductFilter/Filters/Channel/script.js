export default {
  props: ['allChannels'],
  methods: {
    changed() {
      this.$emit('channelChanged', !this.allChannels);
    },
  },
  computed: {
    show() {
      return this.$store.state.channel && this.$store.state.storeName;
    },
    checked() {
      return !this.allChannels;
    },
    channelName() {
      return this.$store.state.storeName;
    },
  },
};
