import { required, numeric } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import { shallowRef, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseForm from 'presentation/components/BaseForm/BaseForm.vue';
import BaseInput from 'presentation/components/BaseInput/BaseInput.vue';
import ServerError from 'presentation/components/ServerError/ServerError.vue';
import useCartTools from 'hooks/useCartTools';
function Rules() {
  this.quantity = { required, numeric };
}

export default {
  name: 'AddToCartForm',
  props: {
    sku: {
      type: String,
      required: true,
    },
    isOnStock: {
      type: Boolean,
      required: true,
    },
    availableQuantity: {
      type: Number,
      required: false,
    },
    addCaption: {
      type: String,
      default: 'addToCart',
    },
  },
  components: {
    BaseForm,
    ServerError,
    BaseInput,
  },
  setup(props) {
    const { t } = useI18n();
    const form = ref({ quantity: 1 });
    const rules = new Rules(form);
    const v = useVuelidate(rules, form);
    const showQuantityError = shallowRef(false);
    const { addLine } = useCartTools();
    const addLineItem = () =>
      addLine(props.sku, Number(form.value.quantity));
    return { t, addLineItem, v, showQuantityError };
  },
};
