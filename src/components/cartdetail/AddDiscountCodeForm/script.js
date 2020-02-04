import { required } from 'vuelidate/lib/validators';
import cartMixin from '@/mixins/cartMixin';
import LoadingButton from '../../common/form/LoadingButton/index.vue';
import ServerError from '../../common/form/ServerError/index.vue';
import BaseForm from '../../common/form/BaseForm/index.vue';
import BaseInput from '../../common/form/BaseInput/index.vue';

export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  data: () => ({
    form: {
      code: null,
    },
  }),
  methods: {
    addDiscountCode() {
      return this.updateMyCart({
        addDiscountCode: {
          code: this.form.code,
        },
      }).then(() => {
        this.form.code = null;
      });
    },
    getErrorMessage({ code }) {
      if (code === 'DiscountCodeNonApplicable') {
        return this.$t('nonApplicable');
      }
      return this.$t('unknownError');
    },
  },
  mixins: [cartMixin],
  validations: {
    form: {
      code: { required },
    },
  },
};
