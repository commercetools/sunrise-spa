import LoadingButton from '../../common/form/LoadingButton/index.vue';

export default {
  components: { LoadingButton },
  props: ['state'],
  methods: {
    goBack() {
      this.$emit('back');
    },
  },
};
