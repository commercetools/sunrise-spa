<template>
  <div v-if="cartExists">
    <BaseForm :vuelidate="$v"
              :onSubmit="setPaymentMethod"
              #default="{ error, state }">
      <div class="checkout-step-title">
        <span>{{ $t('paymentMethod') }}</span>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error"/>
        </div>
      </div>
      <BaseLabel :vuelidate="$v.form.paymentMethod">
        <BaseRadio v-model="form.paymentMethod"
                   value="card"
                   class="checkout-form-option">
          <span class="option-name">
            {{ $t('creditCard') }}
            <span class="option-price">
              <img src="../../assets/img/payment-option-card.gif">
            </span>
          </span>
        </BaseRadio>
        <BaseRadio v-model="form.paymentMethod"
                   value="paypal"
                   class="checkout-form-option">
          <span class="option-name">
            PayPal
            <span class="option-price">
              <img src="../../assets/img/payment-option-paypal.png">
            </span>
          </span>
        </BaseRadio>
      </BaseLabel>
      <CheckoutNavigation :state="state"
                          @back="goToShippingMethod"/>
    </BaseForm>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import cartMixin from '../../mixins/cartMixin';
import BaseRadio from '../common/form/BaseRadio.vue';
import BaseForm from '../common/form/BaseForm.vue';
import BaseLabel from '../common/form/BaseLabel.vue';
import ServerError from '../common/form/ServerError.vue';
import CheckoutNavigation from './CheckoutNavigation.vue';

export default {
  components: {
    BaseLabel,
    CheckoutNavigation,
    ServerError,
    BaseForm,
    BaseRadio,
  },

  mixins: [cartMixin],

  data: () => ({
    form: {
      paymentMethod: 'card',
    },
  }),

  methods: {
    setPaymentMethod() {
      // TODO create payment and add it to the cart, but missing CreateMyPayment mutation
      // return this.updateMyCart([
      //   {
      //     addPayment: {
      //       payment: {
      //         typeId: 'payment',
      //         id: paymentId
      //       },
      //     },
      //   },
      // ]).then(() => this.$router.push({ name: 'checkout-confirmation' }));
      return this.$router.push({ name: 'checkout-order' });
    },

    goToShippingMethod() {
      this.$router.push({ name: 'checkout-shipping-method' });
    },
  },

  validations: {
    form: {
      paymentMethod: { required },
    },
  },
};
</script>

<style scoped>
.option-price img {
  height: 20px;
}
</style>

<i18n>
en:
  paymentMethod: Payment method
  creditCard: Credit Card
de:
  paymentMethod: Zahlungsart
  creditCard: Kreditkarte
</i18n>
