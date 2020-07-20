import { required, email } from 'vuelidate/lib/validators';
import BaseInput from '../../common/form/BaseInput/BaseInput.vue';
import BaseSelect from '../../common/form/BaseSelect/BaseSelect.vue';
import ServerError from '../../common/form/ServerError/ServerError.vue';
import BaseForm from '../../common/form/BaseForm/BaseForm.vue';

export default {
  props: {
    address: Object,
  },
  components: {
    BaseForm,
    ServerError,
    BaseInput,
    BaseSelect,
  },
  data: () => ({
    form: {},
  }),
  watch: {
    formToJSON() {
      this.$emit('updateAddress', this.form);
    },
    validForm() {
      this.$emit('validForm', this.validForm);
    },
  },
  computed: {
    countries() {
      const configCountries = this.$sunrise.countries;
      const countries = configCountries ? Object.entries(configCountries) : [];
      return countries.map(([id, name]) => ({ id, name }));
    },
    formToJSON() {
      return JSON.stringify(this.form);
    },
    validForm() {
      return !this.$v.$invalid;
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
