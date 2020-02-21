import { required, email } from 'vuelidate/lib/validators';
import BaseInput from '../../common/form/BaseInput/index.vue';
import BaseSelect from '../../common/form/BaseSelect/index.vue';
import ServerError from '../../common/form/ServerError/index.vue';
import CheckoutNavigation from '../CheckoutNavigation/index.vue';
import BaseForm from '../../common/form/BaseForm/index.vue';

export default {
  props: {
    address: Object,
    onSubmit: Function,
  },
  components: {
    BaseForm,
    CheckoutNavigation,
    ServerError,
    BaseInput,
    BaseSelect,
  },
  data: () => ({
    form: {},
  }),
  computed: {
    countries() {
      const configCountries = this.$sunrise.countries;
      const countries = configCountries ? Object.entries(configCountries) : [];
      return countries.map(([id, name]) => ({ id, name }));
    },
  },
  methods: {
    submit() {
      return this.onSubmit(this.form);
    },
    goBack() {
      return this.$emit('back');
    },
  },
  created() {
    if (this.address) {
      const { contactInfo, ...address } = this.address;
      this.form = { ...contactInfo, ...address };
      delete this.form.__typename;
    }
    if (!this.form.country) {
      this.form = { ...this.form, country: this.countries[0]?.id };
    }
  },
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      streetName: { required },
      additionalStreetInfo: {},
      postalCode: { required },
      city: { required },
      country: { required },
      phone: {},
      email: { required, email },
    },
  },
};
