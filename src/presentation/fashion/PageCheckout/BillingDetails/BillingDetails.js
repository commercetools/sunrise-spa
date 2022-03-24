import { computed, shallowRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseAddressForm from './BaseAddressForm/BaseAddressForm.vue';
export default {
  props: {
    billingAddress: {
      type: Object,
      required: false,
    },
    shippingAddress: {
      type: Object,
      required: false,
    },
  },
  components: {
    // BaseForm,
    BaseAddressForm,
  },
  setup(props, { emit }) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    const differentAddress = shallowRef(false);
    const newBillingAddress = shallowRef(null);
    const newShippingAddress = shallowRef(null);

    const billingToJSON = computed(() => {
      return JSON.stringify(newBillingAddress.value);
    });
    const shippingToJSON = computed(() => {
      return JSON.stringify(newShippingAddress.value);
    });
    const unsetBillingAddress = () => {
      return (newBillingAddress.value = null);
    };
    const updateBillingAddress = (address) => {
      newBillingAddress.value = address;
    };
    const updateShippingAddress = (address) => {
      newShippingAddress.value = address;
    };
    const validBillingForm = (valid) => {
      emit('valid-billing-form', valid);
    };
    const validShippingForm = (valid) => {
      emit('valid-shipping-form', valid);
    };

    watch(differentAddress, () => {
      if (!differentAddress.value) {
        newShippingAddress.value = null;
        validShippingForm(true);
      } else {
        validShippingForm(false);
      }
    });
    watch(billingToJSON, () => {
      emit(
        'update-billing-details',
        newBillingAddress.value
      );
    });
    watch(shippingToJSON, () => {
      emit(
        'update-shipping-details',
        newShippingAddress.value
      );
    });

    return {
      t,
      billingToJSON,
      shippingToJSON,
      differentAddress,
      newBillingAddress,
      newShippingAddress,
      unsetBillingAddress,
      updateBillingAddress,
      updateShippingAddress,
      validBillingForm,
      validShippingForm,
    };
  },
};
