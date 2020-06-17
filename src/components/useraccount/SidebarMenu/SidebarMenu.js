import authMixin from '../../../mixins/authMixin';

export default {
  computed: {
    activeTab() {
      return this.$route.name;
    },
  },
  mixins: [authMixin],
};
