import gql from 'graphql-tag';

export default {
  components: {},
  props: {
    isModal: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    hasChannels() {
      return this.channels && this.channels.results && this.channels.results.length > 0;
    },
  },

  data: () => ({
    channels: [],
    selectedChannel: null,
  }),

  apollo: {
    channels: {
      query: gql`
        query Channels {
          channels {
            results {
              id,
              key,
              name(locale:"en"),
              roles,
              customFieldsRaw {
                name
                value
              },
            }
          }
        }`,
      result() {
        if (this.hasChannels()) {
          const channelKey = this.$route?.query?.key;
          // console.log(channel);
          const channel = this.channels.results.find((c) => c.key === channelKey);
          if (channel) {
            this.selectedChannel = channel.name;
            this.$store.dispatch('setPriceChannel', channel.id);
            this.$store.dispatch('setStoreName', channel.name);
          } else {
            this.selectedChannel = '(none)';
            this.$store.dispatch('setPriceChannel', undefined);
            this.$store.dispatch('setStoreName', undefined);
          }
        }
      },
    },
  },
};
