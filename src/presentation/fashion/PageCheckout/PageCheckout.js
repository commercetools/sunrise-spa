import BillingDetails from './BillingDetails/BillingDetails.vue';
import OrderOverview from './OrderOverview/OrderOverview.vue';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
import { shallowRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import useCart from 'hooks/useCart';
import useCartTools from 'hooks/useCartTools';

export default {
  components: {
    // CheckoutTopSection,
    OrderOverview,
    BillingDetails,
    ServerError,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const shippingMethod = shallowRef(null);
    const billingAddress = shallowRef(null);
    const shippingAddress = shallowRef(null);
    const validBillingForm = shallowRef(false);
    const validShippingForm = shallowRef(true);
    const paymentMethod = shallowRef('card');
    const showError = shallowRef(false);
    const error = shallowRef(null);
    const { cart, loading } = useCart();
    const cartTools = useCartTools();
    //@todo: what happened to the payment method passed to this?
    const placeOrder = () => {
      if (!validBillingForm.value) {
        showError.value = true;
        return Promise.resolve();
      }
      showError.value = false;
      return cartTools
        .setAddressForCart({
          billingAddress,
          shippingAddress,
        })
        .then(() => {
          router.push({
            name: 'pay',
            params: { method: paymentMethod.value },
          });
        })
        .catch((e) => {
          error.value = e;
        });
    };
    watch([cart, loading], ([cart, loading]) => {
      if (!cart && !loading) {
        router.replace({ path: '/' });
      }
    });
    const setValidBillingForm = (valid) => {
      validBillingForm.value = valid;
    };
    const setValidShippingForm = (valid) => {
      validShippingForm.value = valid;
    };
    const updateBilling = (billingDetails) => {
      billingAddress.value = JSON.parse(
        JSON.stringify(billingDetails)
      );
    };
    const updateShipping = (shippingDetails) => {
      shippingAddress.value = JSON.parse(
        JSON.stringify(shippingDetails)
      );
    };
    const updateShippingMethod = (shippingId) => {
      shippingMethod.value = shippingId;
    };
    const paymentChanged = (payment) => {
      paymentMethod.value = payment;
    };

    return {
      ...cartTools,
      placeOrder,
      shippingMethod,
      billingAddress,
      shippingAddress,
      validBillingForm,
      validShippingForm,
      showError,
      setValidBillingForm,
      setValidShippingForm,
      updateBilling,
      updateShipping,
      updateShippingMethod,
      paymentMethod,
      paymentChanged,
      error,
      cart,
      t,
    };
  },
};
